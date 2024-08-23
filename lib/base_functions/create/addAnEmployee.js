// Takes in VARCHAR(30) inputs for first_name and last_name, shows list of roles for role_id and takes in INTEGER input for manager_id and will insert new employee into employees table in employees_db
async function addAnEmployee(pool, first_name, last_name, role_id_1, manager_id) {
    const query = `
        INSERT INTO employees (first_name, last_name, role_id, manager_id)
        VALUES
            ($1, $2, (SELECT id FROM roles WHERE id = $3), $4); 
    `;
    const values = [first_name, last_name, role_id_1, manager_id];

    try {
        const result = await pool.query(query, values);
        console.log('Employee added successfully!');

        // Immediately shows the employees table after successfully adding a employee.
        const newQuery = `
        SELECT employees.id, employees.first_name, employees.last_name, employees.manager_id, roles.title AS role_title, roles.salary AS role_salary
        FROM employees 
        LEFT JOIN roles
        ON employees.role_id = roles.id
        LEFT JOIN departments
        ON roles.department = departments.id
        ORDER BY employees.last_name;
        `;

        const seeNewData = await pool.query(newQuery)
        console.table(seeNewData.rows);
    } catch (error) {
        console.error('Error adding employee:', error);
    }
    return;
  };

  // Export to cli.js
  module.exports = addAnEmployee;