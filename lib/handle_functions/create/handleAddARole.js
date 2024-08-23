const inquirer = require('inquirer');

// Nested inquirer prompt after selecting "Add a role".  Will take in VARCHAR(30) inputs for roleTitle, INTEGER input for roleSalary and will show a list of departments for roleDepartment.
async function handleAddARole(pool) {
    const departmentsQuery = 'SELECT name FROM departments';
    const departmentsResult = await pool.query(departmentsQuery);
    const departmentsNames = departmentsResult.rows.map(row => row.name);
    
    const roleQuestions = [
        {
            type: "input",
            name: "roleTitle",
            message: "Role title?",
            validate: (input) => {
                if (input.trim() === '') {
                    return 'Role title cannot be blank. Please enter a valid role title.';
                }
                return true;
            }
        },
        {
            type: "input",
            name: "roleSalary",
            message: "Role salary?",
            validate: (input) => {
                if (input.trim() !== '' && isNaN(input)) {
                    return 'Salary must be a number and not null.';
                }
                return true;
            }
        },
        {
            type: "list",
            name: "roleDepartment",
            message: "Role department?",
            choices: departmentsNames
        }
    ];
    
    // Turn all inputs into variables
    const roleAnswers = await inquirer.prompt(roleQuestions);
    const title = roleAnswers.roleTitle;
    const salary = roleAnswers.roleSalary;
    const department = roleAnswers.roleDepartment;

    return { title, salary, department };
}

// Export to cli.js
module.exports = handleAddARole;