-- Insert employees
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Matthew', 'Southcott', 3, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('James', 'Smith', 1, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Mary', 'Johnson', 2, 2);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('John', 'Williams', 4, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Patricia', 'Brown', 5, 6);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Robert', 'Jones', 6, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Jennifer', 'Miller', 7, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Michael', 'Davis', 8, 7);

-- Insert roles
INSERT INTO roles (title, salary, department_id) VALUES ('Sales Lead', 100000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ('Salesperson', 80000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ('Lead Engineer', 150000, 2);
INSERT INTO roles (title, salary, department_id) VALUES ('Software Engineer', 120000, 2);
INSERT INTO roles (title, salary, department_id) VALUES ('Accountant', 125000, 3);
INSERT INTO roles (title, salary, department_id) VALUES ('Account Manager', 160000, 3);
INSERT INTO roles (title, salary, department_id) VALUES ('Legal Team Lead', 250000, 4);
INSERT INTO roles (title, salary, department_id) VALUES ('Lawyer', 190000, 4);

-- Insert departments
INSERT INTO departments (name) VALUES ('Sales');
INSERT INTO departments (name) VALUES ('Engineering');
INSERT INTO departments (name) VALUES ('Finance');
INSERT INTO departments (name) VALUES ('Legal');