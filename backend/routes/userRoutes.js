const express = require('express');
const router = express.Router();
const db = require('../db');

// Register a new user
router.post('/register', (req, res) => {
  const { id,name, dob, workplace, occupation, salary } = req.body;
  const sql = 'UPDATE users SET name = ?, dob = ?, workplace = ?, occupation = ?, salary = ? WHERE id = ?';
  db.query(sql, [name, dob, workplace, occupation, salary, id], (err, result)=> {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'Email already in use' });
      }
      return res.status(500).json({ error: 'Something went wrong' });
    }
    res.status(201).json({ message: 'User registered successfully' });
  });
});

// Login user
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';

  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('Login error:', err);
      return res.status(500).json({ error: 'Login failed' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = results[0];
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      dob: user.dob,
      workplace: user.workplace,
      occupation: user.occupation,
      salary:user.salary
    });
  });
});

// ✅ Update user profile
router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { name, dob, workplace, occupation } = req.body;

  console.log('Updating user:', id);
  console.log('Data:', { name, dob, workplace, occupation });

  const sql = 'UPDATE users SET name = ?, dob = ?, workplace = ?, occupation = ? WHERE id = ?';

  db.query(sql, [name, dob, workplace, occupation, id], (err, result) => {
    if (err) {
      console.error('Error updating profile:', err);
      return res.status(500).json({ error: 'Profile update failed' });
    }

    res.status(200).json({ message: 'Profile updated successfully' });
  });
});


// ✅ Get user by ID (useful if page refreshes)
router.get('/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'SELECT * FROM users WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ error: 'Fetch failed' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = results[0];
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      dob: user.dob,
      workplace: user.workplace,
      occupation: user.occupation
    });
  });
});

module.exports = router;
