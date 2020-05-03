// Import dependencies
const inquirer = require("inquirer");
const cTable = require("console.table")

// Define view employees function
viewEmployees = async (connection) => {
  try {
    const [employees] = await connection.query("SELECT e1.id, e1.first_name, e1.last_name, r.title AS role, CONCAT(e2.first_name, ' ', e2.last_name) AS manager FROM employees e1 LEFT JOIN roles r ON e1.role_id=r.id LEFT JOIN employees e2 ON e1.manager_id=e2.id;");
    
    if (!Array.isArray(employees) || !employees.length) {
      console.log("\nEmployees is empty. Add employees!\n");
    } else {
      console.log("");
      console.table(employees);
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// Export view employees function
module.exports = viewEmployees;