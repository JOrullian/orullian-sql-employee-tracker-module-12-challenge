async function viewAllDepartments(pool) {
    const query = `
    SELECT * FROM departments
    ORDER BY departments.name;
    `;
    const result = await pool.query(query);

    console.table(result.rows);
    return;
};

module.exports = viewAllDepartments;