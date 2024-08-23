const { Pool } = require('pg');

const pool = new Pool({
  user: "postgres",
  password: "",
  host: "localhost",
  database: "employees_db",
});

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to employees_db');
  }
});

module.exports = pool;