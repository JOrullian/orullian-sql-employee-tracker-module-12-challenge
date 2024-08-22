const inquirer = require("inquirer");
const { Pool } = require("pg");

const viewAllDepartments = require('./viewAllDepartments');
const viewAllRoles = require('./viewAllRoles');
const viewAllEmployees = require('./viewAllEmployees');

const updateEmployeeRole = require('./updateEmployeeRole');
const handleUpdateEmployeeRole = require('./handle_functions/handleUpdateEmployeeRole');

const addADepartment = require('./addADepartment');
const handleAddADepartment = require('./handle_functions/handleAddADepartment');

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
        const departmentsQuery = 'SELECT name FROM departments';
        const departmentsResult = await this.pool.query(departmentsQuery);
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

        await this.addARole(roleAnswers.roleTitle, roleAnswers.roleSalary, roleAnswers.roleDepartment);
        break;

      case "Add an employee":
        const rolesQuery = 'SELECT title FROM roles';
        const rolesResult = await this.pool.query(rolesQuery);
        const rolesTitles = rolesResult.rows.map(row => row.title);

        const employeeQuestions = [
            {
                type: "input",
                name: "employeeFirstName",
                message: "Employee first name?"
            },
            {
                type: "input",
                name: "employeeLastName",
                message: "Employee last name?"
            },
            {
                type: "list",
                name: "employeeRole",
                message: "Employee role?",
                choices: rolesTitles
            },
            {
                type: "input",
                name: "managerId",
                message: "Manager ID? (Leave blank if none)"
            }
        ];

        const employeeAnswers = await inquirer.prompt(employeeQuestions);
        const managerId = employeeAnswers.managerId ? employeeAnswers.managerId : null;

        console.log(employeeAnswers);

        await this.addAnEmployee(employeeAnswers.employeeFirstName, employeeAnswers.employeeLastName, employeeAnswers.employeeRole, managerId);
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

  async addARole(title, salary, department) {
    const query = `
        INSERT INTO roles (title, salary, department)
        VALUES
            ($1, $2, (SELECT id FROM departments WHERE name = $3)); 
    `;

    const values = [title, salary, department];
    try {
        const result = await this.pool.query(query, values);
        console.log('Role added successfully!');

        const newQuery = `
        SELECT * FROM roles
        ORDER BY roles.title;
        `;

        const seeNewData = await this.pool.query(newQuery)
        console.table(seeNewData.rows);
    } catch (error) {
        console.error('Error adding role:', error);
    }
    return this.run();
  }

  async addAnEmployee(first_name, last_name, role_id, manager_id) {
    console.log(first_name, last_name, role_id, manager_id);
    const query = `
        INSERT INTO employees (first_name, last_name, role_id, manager_id)
        VALUES
            ($1, $2, (SELECT id FROM roles WHERE title = $3), $4); 
    `;
    const values = [first_name, last_name, role_id, manager_id];

    try {
        const result = await this.pool.query(query, values);
        console.log('Employee added successfully!');

        const newQuery = `
        SELECT employees.id, employees.first_name, employees.last_name, employees.manager_id, roles.title AS role_title, roles.salary AS role_salary
        FROM employees 
        LEFT JOIN roles
        ON employees.role_id = roles.id
        LEFT JOIN departments
        ON roles.department = departments.id
        ORDER BY employees.last_name;
        `;

        const seeNewData = await this.pool.query(newQuery)
        console.table(seeNewData.rows);
    } catch (error) {
        console.error('Error adding employee:', error);
    }
    return this.run();
  }
}

module.exports = CLI;