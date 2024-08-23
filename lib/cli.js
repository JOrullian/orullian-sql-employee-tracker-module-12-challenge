const inquirer = require("inquirer");
const { Pool } = require("pg");

// Import all base_functions and handle_functions.  Done to modularize the code and make this page easier to read.
// Inquirer prompts: "View all departments", "View all roles" & "View all Employees" 
const viewAllDepartments = require('./base_functions/read/viewAllDepartments');
const viewAllRoles = require('./base_functions/read/viewAllRoles');
const viewAllEmployees = require('./base_functions/read/viewAllEmployees');

// Inquirer prompts: "View employees by manager" & "View employees by department"
const viewEmployeesByManager = require('./base_functions/read/viewEmployeesByManager');
const viewEmployeesByDepartment = require('./base_functions/read/viewEmployeesByDepartment');

// Inquirer prompt: "Update an employee role"
const updateEmployeeRole = require('./base_functions/update/updateEmployeeRole');
const handleUpdateEmployeeRole = require('./handle_functions/update/handleUpdateEmployeeRole');

// Inquirer prompt: "Update an employee manager"
const updateEmployeeManager = require('./base_functions/update/updateEmployeeManager');
const handleUpdateEmployeeManager = require('./handle_functions/update/handleUpdateEmployeeManager');

// Inquirer prompt: "Add a department"
const addADepartment = require('./base_functions/create/addADepartment');
const handleAddADepartment = require('./handle_functions/create/handleAddADepartment');

// Inquirer prompt: "Add a role"
const addARole = require('./base_functions/create/addARole');
const handleAddARole = require('./handle_functions/create/handleAddARole');

// Inquirer prompt: "Add an employee"
const addAnEmployee = require('./base_functions/create/addAnEmployee');
const handleAddAnEmployee = require('./handle_functions/create/handleAddAnEmployee');

// Inquirer prompts: "Delete department", "Delete role" & "Delete employee"
const deleteDepartment = require('./base_functions/delete/deleteDepartment');
const handleDeleteDepartment = require('./handle_functions/delete/handleDeleteDepartment');
const deleteRole = require('./base_functions/delete/deleteRole');
const handleDeleteRole = require('./handle_functions/delete/handleDeleteRole');
const deleteEmployee = require('./base_functions/delete/deleteEmployee');
const handleDeleteEmployee = require('./handle_functions/delete/handleDeleteEmployee');

class CLI {
  constructor() {
    // Connect this class to the employees_db.  User needs to input their postgres password below.
    this.pool = new Pool(
      {
        user: "postgres",
        password: "",
        host: "localhost",
        database: "employees_db",
      },
      console.log(`Connected to employees_db`)
    );

    this.pool.connect();
  }

  // Initially show all employee data currently in the employees_db.  Only occurs once when the app is initialized.  Same data can be called back with the view all employees inquirer prompt.
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
      // App will show a list of inquirer prompts which the user can select between for deeper functionality.
    const { actions } = await inquirer.prompt([
      {
        type: "list",
        name: "actions",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "View employees by manager",
          "View employees by department",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Update an employee manager",
          "Delete department",
          "Delete role",
          "Delete employee"
        ],
      },
    ]);

    // Switch cases for all inquirer prompts.  Based on user selection, the specific case will fire its function(s) and will finish by rerunning the original run function, returning the user to the main inquirer selection prompts.
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
      case "View employees by manager":
        await viewEmployeesByManager(this.pool);
        this.run();
        break;
      case "View employees by department":
        await viewEmployeesByDepartment(this.pool);
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
        const { first_name, last_name, role_id_1, manager_id } = await handleAddAnEmployee(this.pool);
        await addAnEmployee(this.pool, first_name, last_name, role_id_1, manager_id);
        this.run();
        break;
      case "Update an employee role":
        const { role_id, id } = await handleUpdateEmployeeRole(this.pool);
        await updateEmployeeRole(this.pool, role_id, id);
        this.run();
        break;
      case "Update an employee manager":
        const { manager_id_1, id_1 } = await handleUpdateEmployeeManager(this.pool);
        await updateEmployeeManager(this.pool, manager_id_1, id_1);
        this.run();
        break;
      case "Delete department":
        const { department_id_1 } = await handleDeleteDepartment(this.pool);
        await deleteDepartment(this.pool, department_id_1);
        this.run();
        break;
      case "Delete role":
        const { role_id_2 } = await handleDeleteRole(this.pool);
        await deleteRole(this.pool, role_id_2);
        this.run();
        break;
      case "Delete employee":
        const { employee_id } = await handleDeleteEmployee(this.pool);
        await deleteEmployee(this.pool, employee_id);
        this.run();
        break;
      default:
        console.log("Invalid action selected.");
    }
  }
}

// Export to server.js in root folder
module.exports = CLI;