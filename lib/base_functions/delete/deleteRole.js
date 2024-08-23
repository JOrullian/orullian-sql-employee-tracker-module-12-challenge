// Shows a list of roles and will delete a role in the roles table in employees_db
async function deleteRole(pool, role_id_2) {
    const query = `
        DELETE FROM roles
        WHERE title = $1
    `;
    const values = [role_id_2];

    try {
        const result = await pool.query(query, values);
        console.log('Role deleted successfully!');

        // Immediately shows the roles table after successfully deleting a role.
        const newQuery = `
        SELECT * FROM roles
        ORDER BY roles.title;
        `;

        const seeNewData = await pool.query(newQuery)
        console.table(seeNewData.rows);
    } catch (error) {
        console.error('Error deleting role:', error);
    }
    return;
};

// Export to cli.js
module.exports = deleteRole;