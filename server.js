// Dependencies
const express = require('express');
const { Pool } = require('pg');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const pool = new Pool(
    {
        user: '',
        password: '',
        host: 'localhost',
        database: ''
    },
    console.log(`Connected to ${pool.database}`)
)

pool.connect();

// Read list of all employees data, including role table data (role.title and role.salary) and department table data (department.name)
app.get('/api/employees', (req, res) => {
    const sql = `
    SELECT employees.id, employees.first_name, employees.last_name, employees.manager_id, roles.title AS role_title, roles.salary AS role_salary
    FROM employees 
    LEFT JOIN roles
    ON employees.role_id = roles.id
    LEFT JOIN departments
    ON roles.department = departments.id;
    `;

    pool.query(sql, (err, { rows }) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});