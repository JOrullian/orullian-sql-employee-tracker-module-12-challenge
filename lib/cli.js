const inquirer = require("inquirer");
const { Pool } = require("pg");

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
        await this.viewAllDepartments();
        break;
      case "View all roles":
        await this.viewAllRoles();
        break;
      case "View all employees":
        await this.viewAllEmployees();
        break;
      case "Add a department":
        await inquirer.prompt([
            {
                type: "input",
                name: "departmentName",
                message: "Department name?"
            }
        ])
        await this.addADepartment();
        break;
      case "Add a role":
        await inquirer.prompt([
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
                choices: []
            }
        ])
        await this.addARole();
        break;
      case "Add an employee":
        await inquirer.prompt([
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
                choices: []
            },
            {
                type: "input",
                name: "managerId",
                message: "Manager ID? (Leave blank if none)"
            }
        ])
        await this.addAnEmployee();
        break;
      case "Update an employee role":
        await inquirer.prompt([
            {
                type: "list",
                name: "selectEmployee",
                message: "Select employee:",
                choices: []
            },
            {
                type: "list",
                name: "changeRole",
                message: "Select new role:",
                choices: []
            }
        ])
        await this.updateAnEmployeeRole();
        break;
      default:
        console.log("Invalid action selected.");
    }
  }

  async viewAllDepartments() {
    const query = `
    SELECT * FROM departments
    ORDER BY departments.name;
    `;
    const result = await this.pool.query(query);

    console.table(result.rows);
  }

  async viewAllRoles() {
    const query = `
    SELECT * FROM roles
    ORDER BY roles.title;
    `;
    const result = await this.pool.query(query);

    console.table(result.rows);
  }

  async viewAllEmployees() {
    const query = `
    SELECT * FROM employees
    ORDER BY employees.last_name;
    `;
    const result = await this.pool.query(query);

    console.table(result.rows);
  }

  async addADepartment() {
    const query = `
        INSERT INTO departments (name)
        VALUES
            ($1); 
    `;
    const result = await this.pool.query(query);

    console.table();
  }

  async addARole() {
    const query = `
        INSERT INTO roles (title, salary, department)
        VALUES
            ($1, $2, $3); 
    `;
    const result = await this.pool.query(query);

    console.table();
  }

  async addAnEmployee() {
    const query = `
        INSERT INTO employees (first_name, last_name, role_id, manager_id)
        VALUES
            ($1, $2, $3, $4); 
    `;
    const result = await this.pool.query(query);

    console.table();
  }

  async updateAnEmployeeRole() {
    const query = `
        UPDATE employees
        SET role_id = $1
        WHERE id = $2; 
    `;
    const result = await this.pool.query(query);

    console.table();
  }
}

module.exports = CLI;
