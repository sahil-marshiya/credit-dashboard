import { render, screen } from '@testing-library/react';
import DashboardOverview from './DashboardOverview';

const mockCustomers = [
  {
    customerId: 'CUST1001',
    name: 'Alice',
    monthlyIncome: 5000,
    monthlyExpenses: 3000,
    creditScore: 700,
    outstandingLoans: 10000,
    loanRepaymentHistory: [1, 1, 0],
    accountBalance: 7000,
    status: 'Review'
  }
];

test('renders dashboard with customer name', () => {
  render(<DashboardOverview customers={mockCustomers} />);
  expect(screen.getByText(/alice/i)).toBeInTheDocument();
});
