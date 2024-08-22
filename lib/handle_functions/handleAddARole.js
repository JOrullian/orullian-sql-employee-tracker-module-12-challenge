const inquirer = require('inquirer');

async function handleAddARole(pool) {
    const departmentsQuery = 'SELECT name FROM departments';
    const departmentsResult = await pool.query(departmentsQuery);
    const departmentsNames = departmentsResult.rows.map(row => row.name);
    
    const roleQuestions = [
        {
            type: "input",
            name: "roleTitle",
            message: "Role title?"
        },
        {
            type: "input",
            name: "roleSalary",
            message: "Role salary?"
        },
        {
            type: "list",
            name: "roleDepartment",
            message: "Role department?",
            choices: departmentsNames
        }
    ];
    
    const roleAnswers = await inquirer.prompt(roleQuestions);
    const title = roleAnswers.roleTitle;
    const salary = roleAnswers.roleSalary;
    const department = roleAnswers.roleDepartment;

    return { title, salary, department };
}

module.exports = handleAddARole;