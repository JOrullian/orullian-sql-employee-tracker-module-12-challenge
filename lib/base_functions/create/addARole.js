// Takes in VARCHAR(30) input for title, INTEGER input for salary and will show a list of departments for department and will insert new role into roles table in employees_db
async function addARole(pool, title, salary, department) {
    
    const query = `
        INSERT INTO roles (title, salary, department)
        VALUES
            ($1, $2, (SELECT id FROM departments WHERE name = $3)); 
    `;

    const values = [title, salary, department];
    try {
        const result = await pool.query(query, values);
        console.log('Role added successfully!');

        // Immediately shows the roles table after successfully adding a role.
        const newQuery = `
            SELECT roles.id, roles.title, roles.salary, departments.name AS department_name FROM roles
            LEFT JOIN departments
            ON roles.department = departments.id
            ORDER BY roles.title;
            `;

        const seeNewData = await pool.query(newQuery)
        console.table(seeNewData.rows);
    } catch (error) {
        console.error('Error adding role:', error);
    }
    return;
};

// Export to cli.js
module.exports = addARole;