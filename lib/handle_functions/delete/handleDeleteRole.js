const inquirer = require('inquirer');

// Nested inquirer prompt after selecting "Delete role".  Will show a list of roles for selectRoleDelete.
async function handleDeleteRole(pool) {
    const deleteRoleQuery = 'SELECT id, title FROM roles';
    const deleteRoleResult = await pool.query(deleteRoleQuery);
    const deleteRoleNames = deleteRoleResult.rows;

    const roleChoices = deleteRoleNames.map(role => ({
        name: role.title,
        value: role.title
    }));

    const deleteRoleQuestions = [
        {
            type: "list",
            name: "selectRoleDelete",
            message: "Select role:",
            choices: roleChoices
        }
    ];

    // Turn all inputs into variables
    const deleteRoleAnswers = await inquirer.prompt(deleteRoleQuestions);
    const role_id_2 = deleteRoleAnswers.selectRoleDelete;

    return { role_id_2 };
};

// Export to cli.js
module.exports = handleDeleteRole;