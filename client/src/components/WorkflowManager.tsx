import { Card, Form, Select, Button, List, message } from 'antd';
import axios from 'axios';
import { useState } from 'react';

const { Option } = Select;

const WorkflowManager = ({ customers, refresh }: { customers: any[]; refresh: () => void }) => {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});

  const handleStatusChange = (customerId: string, value: string) => {
    setFormValues(prev => ({ ...prev, [customerId]: value }));
  };

  const handleSubmit = async (customerId: string) => {
    const newStatus = formValues[customerId];
    try {
      await axios.patch(`https://kyc-risk-dashboard-aru9.onrender.com/customers/${customerId}/status`, { status: newStatus });
      message.success(`Updated status for ${customerId} to ${newStatus}`);
      refresh(); // refresh customer list from backend
    } catch (error) {
      message.error('Update failed');
    }
  };

  return (
    <Card>
      <List
        itemLayout="horizontal"
        dataSource={customers}
        renderItem={(customer) => (
          <List.Item>
            <Form layout="inline">
              <Form.Item label={customer.name}>
                <Select
                  value={formValues[customer.customerId] || customer.status}
                  onChange={(value) => handleStatusChange(customer.customerId, value)}
                  style={{ width: 150 }}
                >
                  <Option value="Review">Review</Option>
                  <Option value="Approved">Approved</Option>
                  <Option value="Rejected">Rejected</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  onClick={() => handleSubmit(customer.customerId)}
                >
                  Update
                </Button>
              </Form.Item>
            </Form>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default WorkflowManager;
