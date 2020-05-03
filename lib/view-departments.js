// Import dependencies
const inquirer = require("inquirer");
const cTable = require("console.table");

// Define view department function
viewDepartment = async (connection) => {
  // TODO
  try {

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// Export view department function
module.exports = viewDepartment;