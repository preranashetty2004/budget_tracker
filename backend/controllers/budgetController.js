// controllers/budgetController.js
const db = require('../db');

// Get all budgets
const getBudgets = (req, res) => {
  const { user_id } = req.params;
  const sql = 'SELECT * FROM budgets WHERE user_id = ?';
  db.query(sql, [user_id], (err, results) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.status(200).json(results);
  });
};

// Add new budget
const addBudget = (req, res) => {
  const { category, amount, description, user_id } = req.body;
  const sql = 'INSERT INTO budgets (category, amount, description, user_id) VALUES (?, ?, ?, ?)';
  db.query(sql, [category, amount, description, user_id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Insert failed' });
    res.status(201).json({ id: result.insertId, category, amount, description, user_id });
  });
};
// Update budget
const updateBudget = (req, res) => {
  const { id } = req.params;
  const { category, amount, description } = req.body;
  const sql = 'UPDATE budgets SET category = ?, amount = ?, description = ? WHERE id = ?';
  db.query(sql, [category, amount, description, id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Update failed' });
    res.status(200).json({ message: 'Updated successfully' });
  });
};

// Delete budget
const deleteBudget = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM budgets WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: 'Delete failed' });
    res.status(200).json({ message: 'Deleted' });
  });
};

module.exports = { getBudgets, addBudget, updateBudget, deleteBudget };
