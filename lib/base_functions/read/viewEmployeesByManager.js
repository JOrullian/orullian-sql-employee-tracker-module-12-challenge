// Will show the data table employees grouped by manager_id in the employees_db
async function viewEmployeesByManager(pool) {
    const query = `
    SELECT manager_id, ARRAY_AGG(first_name || ' ' || last_name) AS employees
    FROM employees
    GROUP BY manager_id;
    `;
    const result = await pool.query(query);

    console.table(result.rows);
    result.rows.forEach(row => {
        console.log(`Manager ID: ${row.manager_id}\nEmployees: ${row.employees}\n`);
    });

    return;
};

// Export to cli.js
module.exports = viewEmployeesByManager;