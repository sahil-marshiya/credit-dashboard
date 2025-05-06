import { Card, List, Progress, Tag } from 'antd';

const calculateRiskScore = (customer: any): number => {
  const missedPayments = customer.loanRepaymentHistory.filter((p: number) => p === 0).length;
  const loanToIncome = customer.outstandingLoans / customer.monthlyIncome;
  return Math.min(100, missedPayments * 10 + loanToIncome * 20 + (850 - customer.creditScore) / 10);
};

const getRiskTag = (score: number) => {
  if (score < 40) return <Tag color="green">Low Risk</Tag>;
  if (score <= 70) return <Tag color="orange">Medium Risk</Tag>;
  return <Tag color="red">High Risk</Tag>;
};

const RiskAssessment = ({ customers }: { customers: any[] }) => {
  return (
    <Card>
      <List
        itemLayout="horizontal"
        dataSource={customers}
        renderItem={(customer) => {
          const score =calculateRiskScore(customer);
          return (
            <List.Item>
              <List.Item.Meta
                title={`${customer.name} (${customer.customerId})`}
                description={
                  <>
                    <div>Risk Score: {score.toFixed(1)} {getRiskTag(score)}</div>
                    <Progress percent={+score.toFixed(1)} status={score > 70 ? 'exception' : score >= 40 ? 'active' : 'normal'} />
                  </>
                }
              />
            </List.Item>
          );
        }}
      />
    </Card>
  );
};

export default RiskAssessment;
