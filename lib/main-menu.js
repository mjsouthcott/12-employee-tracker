// Import dependencies
const inquirer = require("inquirer");
const addDepartment = require("./add-department");
const addEmployee = require("./add-employee");
const addRole = require("./add-role");
const deleteDepartment = require("./delete-department");
const deleteEmployee = require("./delete-employee");
const deleteRole = require("./delete-role");
const updateEmployeeManager = require("./update-employee-manager");
const updateEmployeeRole = require("./update-employee-role");
const viewDepartmentBudget = require("./view-department-budget");
const viewDepartments = require("./view-departments")
const viewEmployeesByManager = require("./view-employees-by-manager");
const viewEmployees = require("./view-employees");
const viewRoles = require("./view-roles");

// Define main menu function
mainMenu = async (connection) => {
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
      "View Department Budget",
      "View Employees by Manager",
      "Quit"
    ],
  });

  switch (userInput.mainMenuSelection) {
    case "Add Department":
      return addDepartment(connection);
    case "Add Role":
      return addRole(connection);
    case "Add Employee":
      return addEmployee(connection);
    case "View Departments":
      return viewDepartments(connection);
    case "View Roles":
      return viewRoles(connection);
    case "View Employees":
      return viewEmployees(connection);
    case "Update Employee Role":
      return updateEmployeeRole(connection);
    case "Update Employee Manager":
      return updateEmployeeManager(connection);
    case "Delete Department":
      return deleteDepartment(connection);
    case "Delete Role":
      return deleteRole(connection);
    case "Delete Employee":
      return deleteEmployee(connection);
    case "View Department Budget":
      return viewDepartmentBudget(connection);
    case "View Employees by Manager":
      return viewEmployeesByManager(connection);
    case "Quit":
      console.log("\nThank you for using EmployeeTracker. Goodbye.");
      return false;
  }
}

module.exports = mainMenu;