const inquirer = require('inquirer');

async function handleUpdateEmployeeRole(pool) {
    const updateEmployeesQuery = 'SELECT id, first_name, last_name FROM employees';
    const updateEmployeesResult = await pool.query(updateEmployeesQuery);
    const updateEmployeesNames = updateEmployeesResult.rows;

    const updateRolesQuery = 'SELECT id, title FROM roles';
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

    const updateEmployeeAnswers = await inquirer.prompt(updateEmployeeQuestions);
    const role_id = updateEmployeeAnswers.changeRole;
    const id = updateEmployeeAnswers.selectEmployee;

    return { role_id, id, updateEmployeeAnswers };
};

module.exports = handleUpdateEmployeeRole;