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
    const sql = "INSERT INTO departments (name) VALUES (?);"
    await connection.query(sql, departmentName);
    console.log(`${departmentName} added to Departments!`)
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// Export add department function
module.exports = addDepartment;