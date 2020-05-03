// Import dependencies
const inquirer = require("inquirer");
const cTable = require("console.table")

// Define view employees by manager function
viewEmployeesByManager = async (connection) => {
  try {
    const [managers] = await connection.query("SELECT id, CONCAT(first_name, ' ', last_name) as full_name FROM employees WHERE ISNULL(manager_id);");
    
    if (!Array.isArray(managers) || !managers.length) {
      console.log("\nThere are no managers. Update employees!\n");
    } else {
      const managerNames = managers.map(element => element.full_name);
  
      const { managerName } = await inquirer.prompt({
        type: "list",
        message: "Please select a manager:",
        name: "managerName",
        choices: managerNames
      })
  
      const managerId = managers.find(element => element.full_name === managerName).id;
  
      const [employees] = await connection.query("SELECT e1.id, e1.first_name, e1.last_name, r.title AS role FROM employees e1 LEFT JOIN roles r ON e1.role_id=r.id WHERE e1.manager_id=?;", managerId);
      console.log("");
      console.table(employees);
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// Export view employees by manager function
module.exports = viewEmployeesByManager;