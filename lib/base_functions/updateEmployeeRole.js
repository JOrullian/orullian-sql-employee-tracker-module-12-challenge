async function updateEmployeeRole(pool, role_id, id) {
    const query = `
        UPDATE employees
        SET role_id = $1
        WHERE id = $2; 
    `;
    const values = [role_id, id];

    try {
        const result = await pool.query(query, values);
        console.log('Employee role updated successfully!');

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
        console.error('Error updating employee role:', error);
    }
    return;
  };

  module.exports = updateEmployeeRole;