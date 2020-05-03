// Import dependencies
const inquirer = require("inquirer");

// Define add role function
addRole = async (connection) => {
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
    console.log(`${roleTitle} added to Roles!`)
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// Export add role function
module.exports = addRole;