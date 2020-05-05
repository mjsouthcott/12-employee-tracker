// Import dependencies
const inquirer = require("inquirer");
const { validateName } = require("./validate");
const to = require("to-case");

// Define add department function
addDepartment = async (connection) => {
  try {
    let { departmentName } = await inquirer.prompt({
      type: "input",
      message: "Please enter the department name:",
      name: "departmentName",
      validate: validateName
    });

    departmentName = to.title(departmentName);

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