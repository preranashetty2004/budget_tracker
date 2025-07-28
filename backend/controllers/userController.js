const db = require('../db');

// Register new user
const registerUser = (req, res) => {
  const { name, email, password } = req.body;

   console.log('Incoming registration:', { name, email, password });

  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error('Error registering user:', err);
      return res.status(500).json({ error: 'User registration failed' });
    }
    res.status(201).json({ id: result.insertId, name, email });
  });
};

// Login
const loginUser = (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('Login error:', err);
      return res.status(500).json({ error: 'Login failed' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = results[0];
    res.status(200).json(user);
  });
};

// Update profile
const updateUserProfile = (req, res) => {
  const { id } = req.params;
  const { name, dob, workplace, occupation } = req.body;

  const sql = 'UPDATE users SET name = ?, dob = ?, workplace = ?, occupation = ? WHERE id = ?';
  db.query(sql, [name, dob, workplace, occupation, id], (err) => {
    if (err) {
      console.error('Error updating profile:', err);
      return res.status(500).json({ error: 'Update failed' });
    }

    res.status(200).json({ message: 'Profile updated successfully' });
  });
};

// Get user by ID (used in profile)
const getUserById = (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ error: 'Fetch failed' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(results[0]);
  });
};

module.exports = {
  registerUser,
  loginUser,
  updateUserProfile,
  getUserById
};
