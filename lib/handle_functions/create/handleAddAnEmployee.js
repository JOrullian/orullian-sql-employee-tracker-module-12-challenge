const inquirer = require('inquirer');

// Nested inquirer prompt after selecting "Add an employee".  Will take in VARCHAR(30) inputs for employeeFirstName and employeeLastName, show a list of roles to choose from for employeeRole and take in INTEGER input for managerId.
async function handleAddAnEmployee(pool) {
    const rolesQuery = 'SELECT id, title FROM roles';
    const rolesResult = await pool.query(rolesQuery);

    const roleChoices = rolesResult.rows.map(row => ({
        name: row.title,
        value: row.id
    }));
    
    const employeeQuestions = [
        {
            type: "input",
            name: "employeeFirstName",
            message: "Employee first name?",
            validate: (input) => {
                if (input.trim() === '') {
                    return 'First name cannot be blank. Please enter a valid first name.';
                }
                return true;
            }
        },
        {
            type: "input",
            name: "employeeLastName",
            message: "Employee last name?",
            validate: (input) => {
                if (input.trim() === '') {
                    return 'Last name cannot be blank. Please enter a valid last name.';
                }
                return true;
            }
        },
        {
            type: "list",
            name: "employeeRole",
            message: "Employee role?",
            choices: roleChoices
        },
        {
            type: "input",
            name: "managerId",
            message: "Manager ID? (Leave blank if none)",
            validate: (input) => {
                if (input.trim() !== '' && isNaN(input)) {
                    return 'Manager ID must be a number or left blank.';
                }
                return true;
            }
        }
    ];

    
    // Turn all inputs into variables
    const employeeAnswers = await inquirer.prompt(employeeQuestions);
    const first_name = employeeAnswers.employeeFirstName;
    const last_name = employeeAnswers.employeeLastName;
    const role_id_1 = employeeAnswers.employeeRole;
    // Be ok if managerId input is left blank
    const manager_id = employeeAnswers.managerId ? employeeAnswers.managerId : null;
    
    return { first_name, last_name, role_id_1, manager_id };
};

// Export to cli.js
module.exports = handleAddAnEmployee;