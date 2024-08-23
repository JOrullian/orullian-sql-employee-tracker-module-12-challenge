const inquirer = require('inquirer');

// Nested inquirer prompt after selecting "Update an employee role".  Will show a list of employees for selectEmployee and will show a list of roles for changeRole.
async function handleUpdateEmployeeRole(pool) {
    const updateEmployeesQuery = 'SELECT id, first_name, last_name FROM employees ORDER BY last_name';
    const updateEmployeesResult = await pool.query(updateEmployeesQuery);
    const updateEmployeesNames = updateEmployeesResult.rows;

    const updateRolesQuery = 'SELECT DISTINCT ON (title) id, title FROM roles ORDER BY title';
    const updateRolesResult = await pool.query(updateRolesQuery);
    const updateRolesTitles = updateRolesResult.rows;

    const updateEmployeeQuestions = [
        {
            type: "list",
            name: "selectEmployee",
            message: "Select employee:",
            choices: updateEmployeesNames.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }))
        },
        {
            type: "list",
            name: "changeRole",
            message: "Select new role:",
            choices: updateRolesTitles.map(role => ({ name: role.title, value: role.id }))
        }
    ];

    // Turn all inputs into variables
    const updateEmployeeAnswers = await inquirer.prompt(updateEmployeeQuestions);
    const role_id = updateEmployeeAnswers.changeRole;
    const id = updateEmployeeAnswers.selectEmployee;

    return { role_id, id };
};

// Export to cli.js
module.exports = handleUpdateEmployeeRole;