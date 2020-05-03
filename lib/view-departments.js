// Import dependencies
const inquirer = require("inquirer");
const cTable = require("console.table")

// Define view department function
viewDepartment = async (connection) => {
  try {
    const [departments] = await connection.query("SELECT * FROM departments;");
    if (!Array.isArray(departments) || !departments.length) {
      console.log("\nDepartments is empty. Add departments!\n");
    } else {
      console.log("");
      console.table(departments);
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// Export view department function
module.exports = viewDepartment;