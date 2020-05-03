// Import dependencies
const inquirer = require("inquirer");

// Define add department function
addDepartment = async (connection) => {
  try {
    const { departmentName } = await inquirer.prompt({
      type: "text",
      message: "Please enter the department name:",
      name: "departmentName"
    });

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