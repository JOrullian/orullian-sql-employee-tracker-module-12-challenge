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

module.exports = addADepartment;