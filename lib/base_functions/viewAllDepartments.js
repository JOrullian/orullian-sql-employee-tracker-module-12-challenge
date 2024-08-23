// Will show the data table departments in the employees_db
async function viewAllDepartments(pool) {
    const query = `
    SELECT * FROM departments
    ORDER BY departments.name;
    `;
    const result = await pool.query(query);

    console.table(result.rows);
    return;
};

// Export to cli.js
module.exports = viewAllDepartments;