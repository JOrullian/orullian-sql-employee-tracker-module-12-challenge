// Shows a list of departments and will delete a department in the departments table in employees_db
async function deleteDepartment(pool, department_id_1) {
    const query = `
        DELETE FROM departments
        WHERE name = $1
    `;
    const values = [department_id_1];

    try {
        const result = await pool.query(query, values);
        console.log('Department deleted successfully!');

        // Immediately shows the departments table after successfully deleting a department.
        const newQuery = `
        SELECT * FROM departments
        ORDER BY departments.name;
        `;

        const seeNewData = await pool.query(newQuery)
        console.table(seeNewData.rows);
    } catch (error) {
        console.error('Error deleting department:', error);
    }
    return;
};

// Export to cli.js
module.exports = deleteDepartment;