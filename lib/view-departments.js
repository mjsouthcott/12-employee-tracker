// Import dependencies
const inquirer = require("inquirer");
const cTable = require("console.table")

// Define view department function
viewDepartment = async (connection) => {
  try {
    const [departments] = await connection.query("SELECT * FROM departments;");
    console.log("");
    console.table(departments);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// Export view department function
module.exports = viewDepartment;