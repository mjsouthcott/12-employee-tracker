// Import dependencies
const inquirer = require("inquirer");

// Define add role function
addRole = async (connection) => {
  try {
    const [departments] = await connection.query("SELECT * FROM departments;");
    const departmentNames = departments.map(element => element.name);

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
      message: "Please select the role's department:",
      name: "roleDepartmentName",
      choices: departmentNames
    }]);

    const roleDepartmentId = departments.find(element => element.name === roleDepartmentName).id;

    await connection.query("INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);", [roleTitle, roleSalary, roleDepartmentId]);
    console.log(`\n${roleTitle} added to Roles!\n`);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// Export add role function
module.exports = addRole;