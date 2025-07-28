const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const expenseRoutes = require('./routes/expenseRoutes');
const budgetRoutes = require('./routes/budgetRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/expenses', expenseRoutes);
app.use('/api/budgets',budgetRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
