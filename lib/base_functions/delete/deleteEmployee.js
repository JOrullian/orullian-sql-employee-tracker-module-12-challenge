// Shows a list of employees and will delete an employee in the employees table in employees_db
async function deleteEmployee(pool, employee_id) {
    const query = `
        DELETE FROM employees
        WHERE id = $1
    `;
    const values = [employee_id];

    try {
        const result = await pool.query(query, values);
        console.log('Employee deleted successfully!');

        // Immediately shows the roles table after successfully deleting an employee.
        const newQuery = `
        SELECT * FROM employees
        ORDER BY employees.last_name;
        `;

        const seeNewData = await pool.query(newQuery)
        console.table(seeNewData.rows);
    } catch (error) {
        console.error('Error deleting employee:', error);
    }
    return;
};

// Export to cli.js
module.exports = deleteEmployee;