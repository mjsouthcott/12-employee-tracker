// Import dependencies
const inquirer = require("inquirer");

// Define add employee function
addEmployee = async (connection) => {
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

    await connection.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);", [employeeFirstName, employeeLastName, employeeRoleId, employeeManagerId])
    console.log(`${employeeFirstName} ${employeeLastName} added to Employees!`)
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// Export add employee function
module.exports = addEmployee;