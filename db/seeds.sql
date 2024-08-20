INSERT INTO departments (name) VALUES 
    ('Finance'),
    ('Marketing'),
    ('Operations Management'),
    ('Human Resources'),
    ('Information Technology');

INSERT INTO roles (title, salary, department) VALUES
    ('Software Engineer', 80000, 5),
    ('Marketing Manager', 70000, 2),
    ('Financial Analyst', 65000, 1),
    ('HR Specialist', 60000, 4),
    ('Sales Representative', 55000, 2),
    ('Operations Director', 85000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Smith', 2, 1),
    ('Mike', 'Johnson', 3, 1),
    ('Sarah', 'Williams', 4, NULL),
    ('David', 'Brown', 5, 4),
    ('Emily', 'Davis', 1, NULL),
    ('Michael', 'Wilson', 2, 1),
    ('Laura', 'Martinez', 3, 1),
    ('Kevin', 'Nguyen', 4, NULL),
    ('Amanda', 'Garcia', 5, 4);