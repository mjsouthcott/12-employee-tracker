// Import dependencies
const inquirer = require("inquirer");

// Define delete employee function
deleteEmployee = async (connection) => {
  try {
    const [employees] = await connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS full_name FROM employees;")
    if (!Array.isArray(employees) || !employees.length) {
      console.log("\nEmployees is empty. Add employees!\n");
    } else {
      const employeeNames = employees.map(element => element.full_name)
  
      const { employeeName } = await inquirer.prompt({
        type: "list",
        message: "Please select an employee:",
        name: "employeeName",
        choices: employeeNames
      })
  
      const employeeId = employees.find(element => element.full_name === employeeName).id;

      await connection.query("DELETE FROM employees WHERE id=?;", employeeId);
      console.log(`\n${employeeName} deleted from Employees!\n`)
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// Export delete employee function
module.exports = deleteEmployee;