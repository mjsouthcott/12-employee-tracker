-- Drop employee_tracker_db database if it exists
DROP DATABASE IF EXISTS employee_tracker_db;

-- Create employee_tracker_db database and select it for use
CREATE DATABASE employee_tracker_db;
USE employee_tracker_db;

-- Create employees table
CREATE TABLE employees
(
	id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR (30),
    last_name VARCHAR (30),
    role_id INTEGER,
    manager_id INTEGER NULL,
    PRIMARY KEY (id)
);

-- Create roles table
CREATE TABLE roles
(
	id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR (30),
    salary DECIMAL,
    department_id INTEGER,
    PRIMARY KEY (id)
);

-- Create departments table
CREATE TABLE departments
(
	id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR (30),
    PRIMARY KEY (id)
);