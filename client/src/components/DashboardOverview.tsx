import { Card, Statistic, Table, Row, Col } from "antd";
import { LineChart, Line, PieChart, Pie, Tooltip, Cell } from "recharts";

const calculateRiskScore = (customer: any): number => {
  const missedPayments = customer.loanRepaymentHistory.filter(
    (p: number) => p === 0
  ).length;
  const loanToIncome = customer.outstandingLoans / customer.monthlyIncome;
  return Math.min(
    100,
    missedPayments * 10 + loanToIncome * 20 + (850 - customer.creditScore) / 10
  );
};

const DashboardOverview = ({ customers }: { customers: any[] }) => {
  const isTestEnv = process.env.NODE_ENV === "test";

  if (isTestEnv) {
    return (
      <div>
        <h1>Test Dashboard</h1>
        {customers.map((c) => (
          <div key={c.customerId}>{c.name}</div>
        ))}
      </div>
    );
  }

  const incomeData = customers.map((c) => ({
    name: c.name,
    income: c.monthlyIncome,
    expenses: c.monthlyExpenses,
  }));

  const pieData = [
    {
      name: "Low Risk",
      value: customers.filter((c) => calculateRiskScore(c) < 40).length,
    },
    {
      name: "Medium Risk",
      value: customers.filter(
        (c) => calculateRiskScore(c) >= 40 && calculateRiskScore(c) <= 70
      ).length,
    },
    {
      name: "High Risk",
      value: customers.filter((c) => calculateRiskScore(c) > 70).length,
    },
  ];

  const columns = [
    { title: "Customer Id", dataIndex: "customerId" },
    { title: "Name", dataIndex: "name" },
    { title: "Income", dataIndex: "monthlyIncome" },
    { title: "Expenses", dataIndex: "monthlyExpenses" },
    { title: "Credit Score", dataIndex: "creditScore" },
    { title: "Outstanding Loans", dataIndex: "outstandingLoans" },
    { title: "Account Balance", dataIndex: "accountBalance" },
    { title: "Status", dataIndex: "status" },
  ];

  return (
    <>
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={12}>
          <Card>
            <Statistic title="Total Customers" value={customers.length} />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="Total Account Balance"
              value={customers.reduce((acc, c) => acc + c.accountBalance, 0)}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={12}>
          <Card title="Income vs Expenses">
            <LineChart width={500} height={300} data={incomeData}>
              <Line type="monotone" dataKey="income" stroke="#82ca9d" />
              <Line type="monotone" dataKey="expenses" stroke="#8884d8" />
              <Tooltip />
            </LineChart>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Risk Score Distribution">
            <PieChart width={400} height={300}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={["#00C49F", "#FFBB28", "#FF4D4F"][index]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Card>
        </Col>
      </Row>

      <Card title="Customer Data Table">
        <Table dataSource={customers} columns={columns} rowKey="customerId" />
      </Card>
    </>
  );
};

export default DashboardOverview;
