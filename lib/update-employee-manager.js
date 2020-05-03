// Import dependencies
const inquirer = require("inquirer");

// Define update employee manager function
updateEmployeeManager = async (connection) => {
  try {
    const [employees] = await connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS full_name FROM employees;")
    const [managers] = await connection.query("SELECT id, CONCAT(first_name, ' ', last_name) as full_name FROM employees WHERE ISNULL(manager_id);");

    if (!Array.isArray(employees) || !employees.length) {
      console.log("\nEmployees is empty. Add employees!\n");
    } else if (!Array.isArray(managers) || !managers.length) {
      console.log("\nThere are no managers. Update employees!\n");
    } else {
      const employeeNames = employees.map(element => element.full_name);
      const managerNames = managers.map(element => element.full_name);
  
      const { employeeName } = await inquirer.prompt({
        type: "list",
        message: "Please select an employee:",
        name: "employeeName",
        choices: employeeNames
      });

      const filteredManagerNames = managerNames.filter(element => { return element !== employeeName });

      const { managerName } = await inquirer.prompt({
        type: "list",
        message: "Please select a new manager:",
        name: "managerName",
        choices: filteredManagerNames
      });
  
      const employeeId = employees.find(element => element.full_name === employeeName).id;
      const managerId = managers.find(element => element.full_name === managerName).id;

      await connection.query("UPDATE employees SET manager_id=? WHERE id=?;", [managerId, employeeId]);
      console.log(`\n${employeeName}'s manager updated to ${managerName}!\n`);
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// Export update employee manager function
module.exports = updateEmployeeManager;