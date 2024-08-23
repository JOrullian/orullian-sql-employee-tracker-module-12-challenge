const inquirer = require('inquirer');

// Nested inquirer prompt after selecting "Delete department".  Will show a list of departments for selectDepartmentDelete.
async function handleDeleteDepartment(pool) {
    const deleteDepartmentQuery = 'SELECT name FROM departments';
    const deleteDepartmentResult = await pool.query(deleteDepartmentQuery);
    const deleteDepartmentNames = deleteDepartmentResult.rows;

    const deleteDepartmentQuestions = [
        {
            type: "list",
            name: "selectDepartmentDelete",
            message: "Select department:",
            choices: deleteDepartmentNames
        }
    ];

    // Turn all inputs into variables
    const deleteDepartmentAnswers = await inquirer.prompt(deleteDepartmentQuestions);
    const department_id_1 = deleteDepartmentAnswers.selectDepartmentDelete;

    return { department_id_1 };
};

// Export to cli.js
module.exports = handleDeleteDepartment;