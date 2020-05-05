// Import dependencies
const inquirer = require("inquirer");
const { validateName } = require("./validate");
const to = require("to-case");

// Define add employee function
addEmployee = async (connection) => {
  try {
    const [roles] = await connection.query("SELECT id, title FROM roles;");
    const [managers] = await connection.query("SELECT id, CONCAT(first_name, ' ', last_name) as full_name FROM employees WHERE ISNULL(manager_id);");
    const roleTitles = roles.map(element => element.title);
    const managerNames = managers.map(element => element.full_name);
    managerNames.push("None");

    let { employeeFirstName, employeeLastName, employeeRoleTitle, employeeManagerName } = await inquirer.prompt([{
      type: "input",
      message: "Please enter the employee's first name:",
      name: "employeeFirstName",
      validate: validateName
    },
    {
      type: "input",
      message: "Please enter the employee's last name:",
      name: "employeeLastName",
      validate: validateName
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
      choices: managerNames
    }]);

    employeeFirstName = to.title(employeeFirstName);
    employeeLastName = to.title(employeeLastName);

    const employeeRoleId = roles.find(element => element.title === employeeRoleTitle).id;
    let employeeManagerId;
    if (employeeManagerName === "None") employeeManagerId = null;
    else employeeManagerId = managers.find(element => element.full_name === employeeManagerName).id;

    await connection.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);", [employeeFirstName, employeeLastName, employeeRoleId, employeeManagerId]);
    console.log(`\n${employeeFirstName} ${employeeLastName} added to Employees!\n`);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// Export add employee function
module.exports = addEmployee;