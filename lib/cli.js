const inquirer = require('inquirer');

class CLI {
    run() {
        return inquirer
        .prompt([
            {
                type: 'list',
                name: 'actions',
                message: 'What would you like to do?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role'
                ],
            },

        ])
        .then(() => {

        })
    }
}