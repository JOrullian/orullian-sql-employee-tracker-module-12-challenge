const inquirer = require('inquirer');

// Nested inquirer prompt after selecting "Update an employee manager".  Will show a list of employees for selectEmployee and will show a list of manager_ids for changeManager.
async function handleUpdateEmployeeManager(pool) {
    const updateEmployeesQuery = 'SELECT id, first_name, last_name FROM employees ORDER BY last_name';
    const updateEmployeesResult = await pool.query(updateEmployeesQuery);
    const updateEmployeesNames = updateEmployeesResult.rows;

    const updateManagersQuery = 'SELECT DISTINCT manager_id FROM employees ORDER BY manager_id';
    const updateManagersResult = await pool.query(updateManagersQuery);
    const updateManagersTitles = updateManagersResult.rows;

    const updateEmployeeQuestions = [
        {
            type: "list",
            name: "selectEmployee",
            message: "Select employee:",
            choices: updateEmployeesNames.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }))
        },
        {
            type: "list",
            name: "changeManager",
            message: "Select new manager ID:",
            choices: updateManagersTitles.map(employee => ({ name: employee.manager_id, value: employee.manager_id }))
        }
    ];

    // Turn all inputs into variables
    const updateEmployeeAnswers_1 = await inquirer.prompt(updateEmployeeQuestions);
    const manager_id_1 = updateEmployeeAnswers_1.changeManager;
    const id_1 = updateEmployeeAnswers_1.selectEmployee;

    return { manager_id_1, id_1 };
};

// Export to cli.js
module.exports = handleUpdateEmployeeManager;