// Import dependencies
const inquirer = require("inquirer");
const { validateName } = require("./validate");
const { toTitleCase } = require("./to-title-case");

// Define add department function
addDepartment = async (connection) => {
  try {
    let { departmentName } = await inquirer.prompt({
      type: "input",
      message: "Please enter the department name:",
      name: "departmentName",
      validate: validateName
    });

    departmentName = toTitleCase(departmentName);

    await connection.query("INSERT INTO departments (name) VALUES (?);", departmentName);
    console.log(`\n${departmentName} added to Departments!\n`);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// Export add department function
module.exports = addDepartment;