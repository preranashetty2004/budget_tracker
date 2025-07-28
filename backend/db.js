const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',       // if you have XAMPP default
  database: 'cashly'  // make sure you created this in phpMyAdmin
});

db.connect((err) => {
  if (err) throw err;
  console.log('✅ MySQL connected.');
});

module.exports = db;
