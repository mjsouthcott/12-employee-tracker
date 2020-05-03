// Import dependencies
const inquirer = require("inquirer");
const mysql = require("mysql2/promise");

let connection;

// Add department
addDepartment = async () => {
  try {
    const { departmentName } = await inquirer.prompt({
      type: "text",
      message: "Please enter the department name:",
      name: "departmentName"
    });
    const sql = "INSERT INTO departments (name) VALUES (?);"
    await connection.query(sql, departmentName);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// Add role
addRole = async () => {
  try {
    const [rows] = await connection.query("SELECT name FROM departments;")
    const departmentNames = rows.map(element => element.name)

    const { roleTitle, roleSalary, roleDepartmentName } = await inquirer.prompt([{
      type: "text",
      message: "Please enter the role's title:",
      name: "roleTitle"
    },
    {
      type: "text",
      message: "Please enter the role's salary:",
      name: "roleSalary"
    },
    {
      type: "list",
      message: "Please select the role's deparment:",
      name: "roleDepartmentName",
      choices: departmentNames
    }]);

    const roleDepartmentId = departmentNames.indexOf(roleDepartmentName) + 1;

    await connection.query("INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);", [roleTitle, roleSalary, roleDepartmentId])
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// Add employee
addEmployee = async () => {
  try {
    const [rowsOne] = await connection.query("SELECT title FROM roles;")
    const roleTitles = rowsOne.map(element => element.title)

    const [rowsTwo] = await connection.query("SELECT CONCAT(first_name, ' ', last_name) as full_name FROM employees;")
    const employeeFullNames = rowsTwo.map(element => element.full_name)
    employeeFullNames.push("None")

    const { employeeFirstName, employeeLastName, employeeRoleTitle, employeeManagerName } = await inquirer.prompt([{
      type: "text",
      message: "Please enter the employee's first name:",
      name: "employeeFirstName"
    },
    {
      type: "text",
      message: "Please enter the employee's last name:",
      name: "employeeLastName"
    },
    {
      type: "list",
      message: "Please select the employee's role:",
      name: "employeeRoleTitle",
      choices: roleTitles
    },
    {
      type: "list",
      message: "Please select the employee's manager:",
      name: "employeeManagerName",
      choices: employeeFullNames
    }]);

    const employeeRoleId = roleTitles.indexOf(employeeRoleTitle) + 1;
    let employeeManagerId;
    if (employeeManagerName === "None") employeeManagerId = null;
    else employeeManagerId = employeeFullNames.indexOf(employeeManagerName) + 1;

    // Test
    console.log(employeeFirstName, employeeLastName, employeeRoleTitle, employeeManagerName)
    console.log(employeeRoleId, employeeManagerId)

    await connection.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);", [employeeFirstName, employeeLastName, employeeRoleId, employeeManagerId])

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// View departments
viewDepartments = async () => {
  // TODO
  try {

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// View roles
viewRoles = async () => {
  // TODO
  try {

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// View employees
viewEmployees = async () => {
  // TODO
  try {

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// Update employee role
updateEmployeeRole = async () => {
  // TODO
  try {

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// Update employee manager
updateEmployeeManager = async () => {
  // TODO
  try {

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// View employees by manager
viewEmployeesByManager = async () => {
  // TODO
  try {

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// Delete department
deleteDepartment = async () => {
  // TODO
  try {

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// Delete role
deleteRole = async () => {
  // TODO
  try {

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// Delete employee
deleteEmployee = async () => {
  // TODO
  try {

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// View salaries by department
viewSalariesByDepartment = async () => {
  // TODO
  try {

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

main = async () => {
  // Greet user
  console.log("Welcome to EmployeeTracker.");
  
  let shouldContinue = true;
  try {
    await connect();
    while (shouldContinue) {
      shouldContinue = await mainMenu();
    }
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
}

connect = async () => {
  connection = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "example",
    database: "employee_tracker_db"
  })
  console.log(`Connected as id: ${connection.threadId}`)
}

// Main menu
mainMenu = async () => {
  const userInput = await inquirer.prompt({
    type: "list",
    message: "Please select one of the following options:",
    name: "mainMenuSelection",
    choices: [
      "Add Department",
      "Add Role",
      "Add Employee",
      "View Departments",
      "View Roles",
      "View Employees",
      "Update Employee Role",
      "Update Employee Manager",
      "Delete Department",
      "Delete Role",
      "Delete Employee",
      "View Salaries by Department",
      "Quit"
    ],
  });

  switch (userInput.mainMenuSelection) {
    case "Add Department":
      return addDepartment();
    case "Add Role":
      return addRole();
    case "Add Employee":
      return addEmployee();
    case "View Departments":
      return viewDepartments();
    case "View Roles":
      return viewRoles();
    case "View Employees":
      return viewEmployees();
    case "Update Employee Role":
      return updateEmployeeRole();
    case "Update Employee Manager":
      return updateEmployeeManager();
    case "Delete Department":
      return deleteDepartment();
    case "Delete Role":
      return deleteRole();
    case "Delete Employee":
      return deleteEmployee();
    case "View Salaries by Department":
      return viewSalariesByDepartment();
    case "Quit":
      console.log("Thank you for using EmployeeTracker. Goodbye.");
      return false;
  }
}

// Run program
main();
