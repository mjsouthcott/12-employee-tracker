// Import dependencies
const inquirer = require("inquirer");

// Define update employee role function
updateEmployeeRole = async (connection) => {
  try {
    const [employees] = await connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS full_name FROM employees;");
    const [roles] = await connection.query("SELECT id, title FROM roles;");

    if (!Array.isArray(employees) || !employees.length) {
      console.log("\nEmployees is empty. Add employees!\n");
    } else if (!Array.isArray(roles) || !roles.length) {
      console.log("\nRoles is empty. Add roles!\n");
    } else {
      const employeeNames = employees.map(element => element.full_name);
      const roleTitles = roles.map(element => element.title);
  
      const { employeeName, roleTitle } = await inquirer.prompt([{
        type: "list",
        message: "Please select an employee:",
        name: "employeeName",
        choices: employeeNames
      },
      {
        type: "list",
        message: "Please select a new role:",
        name: "roleTitle",
        choices: roleTitles
      }])
  
      const employeeId = employees.find(element => element.full_name === employeeName).id;
      const roleId = roles.find(element => element.title === roleTitle).id;

      await connection.query("UPDATE employees SET role_id=? WHERE id=?;", [roleId, employeeId]);
      console.log(`\n${employeeName}'s role updated to ${roleTitle}!\n`);
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// Export update employee role function
module.exports = updateEmployeeRole;