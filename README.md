# 📊 Credit Risk Dashboard – Assignment by Kartik Jain

This project is a full-stack credit risk analytics dashboard built as part of the KYC Hub frontend engineering challenge.

It provides insights into customer financial health, risk scoring, and workflow management using React, TypeScript, Ant Design, and Node.js.

---

## ⚙️ Tech Stack

**Frontend**

- React (Vite + TypeScript)
- Ant Design
- Recharts (LineChart, PieChart)
- Axios

**Backend**

- Node.js + Express
- In-memory JSON (simulates data persistence)

**AI Tools Used**

- ✅ **ChatGPT** (primary tool for backend logic, debugging, UI planning, and test strategy)

<!--  -->

🤖 AI Tool Usage
💬 I used ChatGPT to guide me step-by-step — especially for backend development which I was unfamiliar with.

It helped me:

Set up Express routes, CORS, and data simulation

Write the risk scoring logic

Fix test errors and configure ts-jest correctly

I made sure to understand every line of code before using it.

---

<!--  -->

## 📦 Project Features

### 📊 1. Dashboard Overview

- **Cards & Stats** showing total customers and total account balance
- **Line Chart** of Income vs. Expenses (Recharts)
- **Pie Chart** for risk score distribution
- **Sortable, filterable table** of customer data

### ⚠️ 2. Risk Assessment

- Custom **risk score formula** based on:
  - Credit Score
  - Loan Repayment History
  - Loan-to-Income Ratio
- Color-coded score display using AntD **Progress bar + Tag**

### 🔁 3. Workflow Automation

- Ant Design **Select & Form** to update customer status
- **PATCH API** updates data and re-renders UI
- Sends simulated **alert for high-risk customers** (if score > 70)

---

## 🧠 Risk Scoring Logic

```ts
const calculateRiskScore = (customer) => {
  const missed = customer.loanRepaymentHistory.filter((p) => p === 0).length;
  const ratio = customer.outstandingLoans / customer.monthlyIncome;
  return Math.min(
    100,
    missed * 10 + ratio * 20 + (850 - customer.creditScore) / 10
  );
};
```

![alt text](<Screenshot 2025-04-22 at 2.08.49 AM (2).png>)# kyc-risk-dashboard

## 🌐 Hosting Links

- **Frontend (Vercel)**: [https://kyc-risk-dashboard.vercel.app](https://kyc-risk-dashboard.vercel.app)
- **Backend (Render)**: [https://kyc-risk-dashboard-aru9.onrender.com](https://kyc-risk-dashboard-aru9.onrender.com)

✅ The frontend is built with React + TypeScript using Vite and hosted on Vercel.  
✅ The backend is a Node.js + Express server deployed via Render and exposes `/customers`, `/customers/:id/status`, and `/alerts` endpoints.

📌 Risk Scoring Logic
The system calculates a risk score (0 to 100) for each user based on their financial profile.
The scoring formula includes:

Missed Payments: Each missed loan repayment adds 10 points

Loan-to-Income Ratio: Higher ratios increase risk (multiplied by 20)

Credit Score Deviation: The gap from the ideal credit score (850) adds to the score

//code

<!-- Risk Score = (MissedPayments * 10) + (LoanToIncome * 20) + ((850 - CreditScore) / 10) -->

//code

The final score is capped at 100. Based on the score:

Low Risk: 0–40

Medium Risk: 41–70

High Risk: 71–100

These categories are shown in the dashboard with color-coded labels. (Green , Yellow , red )
