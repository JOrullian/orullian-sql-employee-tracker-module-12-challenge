const inquirer = require('inquirer');

async function handleAddAnEmployee(pool) {
    const rolesQuery = 'SELECT title FROM roles';
    const rolesResult = await pool.query(rolesQuery);
    const rolesTitles = rolesResult.rows.map(row => row.title);
    
    const employeeQuestions = [
        {
            type: "input",
            name: "employeeFirstName",
            message: "Employee first name?"
        },
        {
            type: "input",
            name: "employeeLastName",
            message: "Employee last name?"
        },
        {
            type: "list",
            name: "employeeRole",
            message: "Employee role?",
            choices: rolesTitles
        },
        {
            type: "input",
            name: "managerId",
            message: "Manager ID? (Leave blank if none)"
        }
    ];
    
    const employeeAnswers = await inquirer.prompt(employeeQuestions);
    const first_name = employeeAnswers.employeeFirstName;
    const last_name = employeeAnswers.employeeLastName;
    const role_id_update = employeeAnswers.employeeRole;
    const manager_id = employeeAnswers.managerId ? employeeAnswers.managerId : null;
    
    return { first_name, last_name, role_id_update, manager_id };
};

module.exports = handleAddAnEmployee;