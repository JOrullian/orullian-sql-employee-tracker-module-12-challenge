// This file is not required for the CLI application but can be used in the future for api requests.

// Read list of all employees data, including role table data (role.title and role.salary) and department table data (department.name)
app.get("/api/employees_info", (req, res) => {
  const sql = `
    SELECT employees.id, employees.first_name, employees.last_name, employees.manager_id, roles.title AS role_title, roles.salary AS role_salary
    FROM employees 
    LEFT JOIN roles
    ON employees.role_id = roles.id
    LEFT JOIN departments
    ON roles.department = departments.id
    ORDER BY employees.last_name;
    `;

  pool.query(sql, (err, { rows }) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// Read list of all departments (for inquirer: View all departments)
app.get("/api/departments", (req, res) => {
  const sql = `
    SELECT * FROM departments
    ORDER BY departments.name;
    `;

  pool.query(sql, (err, { rows }) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// Add department to departments table (for inquirer: Add a department)
app.post("/api/departments", (req, res) => {
  const { name } = req.body;

  const sql = `
        INSERT INTO departments (name)
        VALUES
            ($1); 
    `;

  pool.query(sql, [name], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    } else if (result.rowCount) {
      res.json({
        message: "success",
        data: result.rowCount,
      });
    }
  });
});

// Read list of all roles (for inquirer: View all roles)
app.get("/api/roles", (req, res) => {
  const sql = `
    SELECT * FROM roles
    ORDER BY roles.title;
    `;

  pool.query(sql, (err, { rows }) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// Add role to roles table (for inquirer: Add a role)
app.post("/api/roles", (req, res) => {
  const { title, salary, department } = req.body;

  const sql = `
        INSERT INTO roles (title, salary, department)
        VALUES
            ($1, $2, $3); 
    `;

  pool.query(sql, [title, salary, department], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    } else if (result.rowCount) {
      res.json({
        message: "success",
        data: result.rowCount,
      });
    }
  });
});

// Read list of all employees (for inquirer: View all employees)
app.get("/api/employees", (req, res) => {
  const sql = `
    SELECT * FROM employees
    ORDER BY employees.last_name;
    `;

  pool.query(sql, (err, { rows }) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// Add employee to employees table (for inquirer: Add an employee)
app.post("/api/employees", (req, res) => {
  const { first_name, last_name, role_id, manager_id } = req.body;

  const sql = `
        INSERT INTO employees (first_name, last_name, role_id, manager_id)
        VALUES
            ($1, $2, $3, $4); 
    `;

  pool.query(
    sql,
    [first_name, last_name, role_id, manager_id],
    (err, result) => {
        console.log(result);
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      } else if (result.rowCount) {
        res.json({
          message: "success",
          data: result.rowCount,
        });
      }
    }
  );
});

// Update employee role from employees table (for inquirer: Update an employee role)
app.post("/api/employees_update", (req, res) => {
  const { role_id, id } = req.body;

  const sql = `
        UPDATE employees
        SET role_id = $1
        WHERE id = $2; 
    `;

  pool.query(sql, [role_id, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    } else if (result.rowCount) {
      res.json({
        message: "success",
        data: result.rowCount,
      });
    }
  });
});

app.listen(PORT, () => {
});