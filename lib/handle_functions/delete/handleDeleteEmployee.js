const inquirer = require('inquirer');

// Nested inquirer prompt after selecting "Delete employee".  Will show a list of employees for selectEmployeeDelete.
async function handleDeleteEmployee(pool) {
    const deleteEmployeeQuery = 'SELECT id, first_name, last_name FROM employees ORDER BY id';
    const deleteEmployeeResult = await pool.query(deleteEmployeeQuery);
    const deleteEmployeeNames = deleteEmployeeResult.rows;

    // Format choices to display full name but return employee ID
    const employeeChoices = deleteEmployeeNames.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
    }));

    const deleteEmployeeQuestions = [
        {
            type: "list",
            name: "selectEmployeeDelete",
            message: "Select role:",
            choices: employeeChoices
        }
    ];

    // Turn all inputs into variables
    const deleteEmployeeAnswers = await inquirer.prompt(deleteEmployeeQuestions);
    const employee_id = deleteEmployeeAnswers.selectEmployeeDelete;

    return { employee_id };
};

// Export to cli.js
module.exports = handleDeleteEmployee;