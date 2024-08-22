async function viewAllRoles(pool) {
    const query = `
    SELECT roles.id, roles.title, roles.salary, departments.name AS department_name FROM roles
    LEFT JOIN departments
    ON roles.department = departments.id
    ORDER BY roles.title;
    `;
    const result = await pool.query(query);

    console.table(result.rows);
    return;
};

  module.exports = viewAllRoles;