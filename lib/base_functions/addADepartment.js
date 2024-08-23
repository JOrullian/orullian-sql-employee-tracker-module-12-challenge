// Takes in VARCHAR(30) input and will insert new department name into departments table in employees_db
async function addADepartment(pool, name) {
    const query = `
        INSERT INTO departments (name)
        VALUES
            ($1); 
    `;
    const values = [name];

    try {
        const result = await pool.query(query, values);
        console.log('Department added successfully!');

        // Immediately shows the departments table after successfully adding a department.
        const newQuery = `
        SELECT * FROM departments
        ORDER BY departments.name;
        `;

        const seeNewData = await pool.query(newQuery)
        console.table(seeNewData.rows);
    } catch (error) {
        console.error('Error adding department:', error);
    }
    return;
};

// Export to cli.js
module.exports = addADepartment;