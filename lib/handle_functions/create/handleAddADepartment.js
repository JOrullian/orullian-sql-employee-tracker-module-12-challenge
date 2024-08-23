const inquirer = require('inquirer');

// Nested inquirer prompt after selecting "Add a department".  Will take in VARCHAR(30) input for departmentName.
async function handleAddADepartment(pool) {
    const departmentQuestions = [
        {
            type: "input",
            name: "departmentName",
            message: "Department name?",
            validate: (input) => {
                if (input.trim() === '') {
                    return 'Department name cannot be blank. Please enter a valid department name.';
                }
                return true;
            }
        }
    ];

    // Turn input into variable
    const departmentAnswers = await inquirer.prompt(departmentQuestions);
    const name = departmentAnswers.departmentName;

    return { name };
};

// Export to cli.js
module.exports = handleAddADepartment;