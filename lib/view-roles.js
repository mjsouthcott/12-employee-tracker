// Import dependencies
const inquirer = require("inquirer");
const cTable = require("console.table")

// Define view roles function
viewRoles = async (connection) => {
  try {
    const [roles] = await connection.query("SELECT r.id, r.title, r.salary, d.name AS department FROM roles r LEFT JOIN departments d ON r.department_id=d.id;");
    
    if (!Array.isArray(roles) || !roles.length) {
      console.log("\nRoles is empty. Add roles!\n");
    } else {
      console.log("");
      console.table(roles);
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// Export view roles function
module.exports = viewRoles;