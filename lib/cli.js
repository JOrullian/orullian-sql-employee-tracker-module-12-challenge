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
        const departmentQuestions = [
            {
                type: "input",
                name: "departmentName",
                message: "Department name?"
            }
        ];

        const departmentAnswers = await inquirer.prompt(departmentQuestions);

        await this.addADepartment(departmentAnswers.departmentName);
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
        const rolesTitles = rolesResult.rows.map(row => row.name);

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

        await this.addAnEmployee(employeeAnswers.employeeFirstName, employeeAnswers.employeeLastName, employeeAnswers.employeeRole, employeeAnswers.managerId);
        break;

      case "Update an employee role":
        const updateEmployeesQuery = 'SELECT first_name, last_name FROM employees';
        const updateEmployeesResult = await this.pool.query(updateEmployeesQuery);
        const updateEmployeesNames = updateEmployeesResult.rows.map(row => row.name);
        
        const updateRolesQuery = 'SELECT title FROM roles';
        const updateRolesResult = await this.pool.query(updateRolesQuery);
        const updateRolesTitles = updateRolesResult.rows.map(row => row.name);

        const updateEmployeeQuestions = [
            {
                type: "list",
                name: "selectEmployee",
                message: "Select employee:",
                choices: updateEmployeesNames
            },
            {
                type: "list",
                name: "changeRole",
                message: "Select new role:",
                choices: updateRolesTitles
            }
        ];

        const updateEmployeeAnswers = await inquirer.prompt(updateEmployeeQuestions);

        await this.updateAnEmployeeRole(updateEmployeeAnswers.changeRole, updateEmployeeAnswers.selectEmployee);
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
    return this.run();
  }

  async viewAllRoles() {
    const query = `
    SELECT * FROM roles
    ORDER BY roles.title;
    `;
    const result = await this.pool.query(query);

    console.table(result.rows);
    return this.run();
  }

  async viewAllEmployees() {
    const query = `
    SELECT employees.id, employees.first_name, employees.last_name, employees.manager_id, roles.title AS role_title, roles.salary AS role_salary
    FROM employees 
    LEFT JOIN roles
    ON employees.role_id = roles.id
    LEFT JOIN departments
    ON roles.department = departments.id
    ORDER BY employees.last_name;
    `;
    const result = await this.pool.query(query);

    console.table(result.rows);
    return this.run();
  }

  async addADepartment(name) {
    
    const query = `
        INSERT INTO departments (name)
        VALUES
            ($1); 
    `;
    const values = [name];

    try {
        const result = await this.pool.query(query, values);
        console.log('Department added successfully!');

        const newQuery = `
        SELECT * FROM departments
        ORDER BY departments.name;
        `;

        const seeNewData = await this.pool.query(newQuery)
        console.table(seeNewData.rows);
    } catch (error) {
        console.error('Error adding department:', error);
    }
    return this.run();
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
    const query = `
        INSERT INTO employees (first_name, last_name, role_id, manager_id)
        VALUES
            ($1, $2, (SELECT id FROM roles WHERE id = $3), $4); 
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

  async updateAnEmployeeRole(role_id, id) {
    const query = `
        UPDATE employees
        SET role_id = $1
        WHERE id = $2; 
    `;
    const values = [role_id, id];

    try {
        const result = await this.pool.query(query, values);
        console.log('Employee role updated successfully!');

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
        console.error('Error updating employee role:', error);
    }
    return this.run();
  }
}

module.exports = CLI;
