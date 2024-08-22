const inquirer = require('inquirer');

async function handleAddADepartment(pool) {
    const departmentQuestions = [
        {
            type: "input",
            name: "departmentName",
            message: "Department name?"
        }
    ];

    const departmentAnswers = await inquirer.prompt(departmentQuestions);
    const name = departmentAnswers.departmentName;

    return { name };
};

module.exports = handleAddADepartment;