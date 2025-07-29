const db = require('../db');

// GET all expenses
exports.getExpenses = (req, res) => {
  const { user_id } = req.params;
  db.query('SELECT * FROM expenses WHERE user_id = ?', [user_id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};
// POST a new expense
exports.addExpense = (req, res) => {
  const { category, date, amount, paymentMode, description, user_id } = req.body;
  const sql = 'INSERT INTO expenses (category, date, amount, paymentMode, description, user_id) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [category, date, amount, paymentMode, description, user_id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

// DELETE an expense
exports.deleteExpense = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM expenses WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.status(200).json({ message: 'Expense deleted successfully' });
  });
};

// PUT (optional): Update an expense
exports.updateExpense = (req, res) => {
  const { id } = req.params.id;
  const { category, date, amount, paymentMode, description } = req.body;
  const sql = 'UPDATE expenses SET category = ?, date = ?, amount = ?, paymentMode = ?, description = ? WHERE id = ?';
  db.query(sql, [category, date, amount, paymentMode, description, id], (err) => {
    if (err) return res.status(500).send(err);
    res.status(200).json({ message: 'Expense updated successfully' });
  });
};
