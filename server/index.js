const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Read data.json at startup
let customers = [];
try {
  const rawData = fs.readFileSync('./data.json');
  customers = JSON.parse(rawData);
} catch (err) {
  console.error('❌ Error loading data.json:', err);
}

app.get('/customers', (req, res) => {
  res.json(customers);
});

app.patch('/customers/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const customer = customers.find(c => c.customerId === id);
  if (customer) {
    customer.status = status;
    res.json({ success: true, updated: customer });
  } else {
    res.status(404).json({ error: 'Customer not found' });
  }
});

app.post('/alerts', (req, res) => {
  console.log('🚨 High Risk Alert:', req.body);
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
