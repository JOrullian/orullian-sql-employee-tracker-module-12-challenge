// Will show the data table employees grouped by department in the employees_db
async function viewEmployeesByDepartment(pool) {
    const query = `
    SELECT departments.name AS department, ARRAY_AGG(employees.first_name || ' ' || employees.last_name) AS employees
    FROM employees
    LEFT JOIN roles
    ON employees.role_id = roles.id
    LEFT JOIN departments
    ON roles.department = departments.id    
    GROUP BY departments.name;
    `;
    const result = await pool.query(query);

    console.table(result.rows);
    result.rows.forEach(row => {
        console.log(`Department: ${row.department}\nEmployees: ${row.employees}\n`);
    });

    return;
};

// Export to cli.js
module.exports = viewEmployeesByDepartment;