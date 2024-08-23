// Will show the data table employees in the employees_db
async function viewAllEmployees(pool) {
    const query = `
    SELECT employees.id, employees.first_name, employees.last_name, departments.name AS dept_name, roles.title AS job_title, roles.salary AS salary, employees.manager_id
    FROM employees 
    LEFT JOIN roles
    ON employees.role_id = roles.id
    LEFT JOIN departments
    ON roles.department = departments.id
    ORDER BY employees.last_name;
    `;
    const result = await pool.query(query);

    console.table(result.rows);
    return;
};

// Export to cli.js
module.exports = viewAllEmployees;