// Import dependencies
const inquirer = require("inquirer");

// Define delete department function
deleteDepartment = async (connection) => {
  try {
    const [departments] = await connection.query("SELECT * FROM departments;")
    
    if (!Array.isArray(departments) || !departments.length) {
      console.log("\nDepartments is empty. Add departments!\n");
    } else {
      const departmentNames = departments.map(element => element.name);
  
      const { departmentName } = await inquirer.prompt({
        type: "list",
        message: "Please select a department:",
        name: "departmentName",
        choices: departmentNames
      })
  
      await connection.query("DELETE FROM departments WHERE name=?;", departmentName);
      console.log(`\n${departmentName} deleted from Departments!\n`);
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// Export delete department function
module.exports = deleteDepartment;