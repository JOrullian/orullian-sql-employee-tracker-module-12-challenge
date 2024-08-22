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

        const newQuery = `
        SELECT * FROM roles
        ORDER BY roles.title;
        `;

        const seeNewData = await pool.query(newQuery)
        console.table(seeNewData.rows);
    } catch (error) {
        console.error('Error adding role:', error);
    }
    return;
  }

  module.exports = addARole;