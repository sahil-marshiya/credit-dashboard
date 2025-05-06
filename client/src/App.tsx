import { useEffect, useState } from "react";
import axios from "axios";
import { Layout, Typography, Switch, ConfigProvider, theme } from "antd";
import DashboardOverview from "./components/DashboardOverview";
import RiskAssessment from "./components/RiskAssessment";
import WorkflowManager from "./components/WorkflowManager";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  const [customers, setCustomers] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const fetchCustomers = async () => {
    const res = await axios.get("https://kyc-risk-dashboard-aru9.onrender.com/customers");
    setCustomers(res.data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "white",
          }}
        >
          <span>Credit Risk Dashboard</span>
          <Switch
          style={{
            marginTop: "15px",
            // background: "yellow",
          
          }}
            checkedChildren="🌙"
            unCheckedChildren="☀️"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </Header>
        <Content style={{ padding: "20px" }}>
          <Title level={2}>Dashboard Overview</Title>
          <DashboardOverview customers={customers} />
          <Title level={2}>Risk Assessment</Title>
          <RiskAssessment customers={customers} />
          <Title level={2}>Workflow Manager</Title>
          <WorkflowManager customers={customers} refresh={fetchCustomers} />
        </Content>
        <Footer style={{ textAlign: "center" }}>Built by Kartik Jain</Footer>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
