const inquirer = require("inquirer");
const { Pool } = require("pg");

const viewAllDepartments = require('./base_functions/viewAllDepartments');
const viewAllRoles = require('./base_functions/viewAllRoles');
const viewAllEmployees = require('./base_functions/viewAllEmployees');

const updateEmployeeRole = require('./base_functions/updateEmployeeRole');
const handleUpdateEmployeeRole = require('./handle_functions/handleUpdateEmployeeRole');

const addADepartment = require('./base_functions/addADepartment');
const handleAddADepartment = require('./handle_functions/handleAddADepartment');

const addARole = require('./base_functions/addARole');
const handleAddARole = require('./handle_functions/handleAddARole');

const addAnEmployee = require('./base_functions/addAnEmployee');
const handleAddAnEmployee = require('./handle_functions/handleAddAnEmployee');

class CLI {
  constructor() {
    this.pool = new Pool(
      {
        user: "postgres",
        password: "Jederiah2016*",
        host: "localhost",
        database: "employees_db",
      },
      console.log(`Connected to employees_db`)
    );

    this.pool.connect();
  }

  async showStartData() {
    const query = `
    SELECT employees.id, employees.first_name, employees.last_name, departments.name AS dept_name, roles.title AS job_title, roles.salary AS salary, employees.manager_id
    FROM employees 
    LEFT JOIN roles
    ON employees.role_id = roles.id
    LEFT JOIN departments
    ON roles.department = departments.id
    ORDER BY employees.last_name;
    `;

    const result = await this.pool.query(query);

    console.table(result.rows);
    return;
  }

  async run() {
    const { actions } = await inquirer.prompt([
      {
        type: "list",
        name: "actions",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
        ],
      },
    ]);

    switch (actions) {
      case "View all departments":
        await viewAllDepartments(this.pool);
        this.run();
        break;
      case "View all roles":
        await viewAllRoles(this.pool);
        this.run();
        break;
      case "View all employees":
        await viewAllEmployees(this.pool);
        this.run();
        break;
      case "Add a department":
        const { name } = await handleAddADepartment(this.pool);
        await addADepartment(this.pool, name);
        this.run();
        break;
      case "Add a role":
        const { title, salary, department } = await handleAddARole(this.pool);
        await addARole(this.pool, title, salary, department);
        this.run();
        break;
      case "Add an employee":
        const { first_name, last_name, role_id_update, manager_id } = await handleAddAnEmployee(this.pool);
        await addAnEmployee(this.pool, first_name, last_name, role_id_update, manager_id);
        this.run();
        break;
      case "Update an employee role":
        const { role_id, id, updateEmployeeAnswers } = await handleUpdateEmployeeRole(this.pool);
        await updateEmployeeRole(this.pool, role_id, id);
        this.run();
        break;
      default:
        console.log("Invalid action selected.");
    }
  }
}

module.exports = CLI;