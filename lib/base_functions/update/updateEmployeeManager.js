// Shows a list of employees for id and shows a list of manager IDs for manager_id and will update an employee manager for the employees table in employees_db
async function updateEmployeeManager(pool, manager_id_1, id_1) {
    const query = `
        UPDATE employees
        SET manager_id = $1
        WHERE id = $2; 
    `;
    const values = [manager_id_1, id_1];

    try {
        const result = await pool.query(query, values);
        console.log('Employee manager updated successfully!');

        // Immediately shows the employees table after successfully updating a manager_id.
        const newQuery = `
        SELECT employees.id, employees.first_name, employees.last_name, employees.manager_id, roles.title AS role_title, roles.salary AS role_salary
        FROM employees 
        LEFT JOIN roles
        ON employees.role_id = roles.id
        LEFT JOIN departments
        ON roles.department = departments.id
        ORDER BY employees.last_name;
        `;

        const seeNewData = await pool.query(newQuery)
        console.table(seeNewData.rows);
    } catch (error) {
        console.error('Error updating employee manager:', error);
    }
    return;
};

// Export to cli.js
module.exports = updateEmployeeManager;