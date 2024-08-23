const inquirer = require('inquirer');

// Nested inquirer prompt after selecting "Add an employee".  Will take in VARCHAR(30) inputs for employeeFirstName and employeeLastName, show a list of roles to choose from for employeeRole and take in INTEGER input for managerId.
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
    
    // Turn all inputs into variables
    const employeeAnswers = await inquirer.prompt(employeeQuestions);
    const first_name = employeeAnswers.employeeFirstName;
    const last_name = employeeAnswers.employeeLastName;
    const role_id_update = employeeAnswers.employeeRole;
    // Be ok if managerId input is left blank
    const manager_id = employeeAnswers.managerId ? employeeAnswers.managerId : null;
    
    return { first_name, last_name, role_id_update, manager_id };
};

// Export to cli.js
module.exports = handleAddAnEmployee;