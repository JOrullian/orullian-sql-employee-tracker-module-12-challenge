const { Pool } = require('pg');

// Begin by inputting postgres password below
const pool = new Pool({
  user: "postgres",
  password: "",
  host: "localhost",
  database: "employees_db",
});

// Connect to the employees_db
pool.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to employees_db');
  }
});

// Export to cli.js
module.exports = pool;