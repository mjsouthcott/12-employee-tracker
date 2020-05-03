// Import dependencies
const inquirer = require("inquirer");
const cTable = require("console.table")

// Define view department budget function
viewDepartmentBudget = async (connection) => {
  try {
    const [departments] = await connection.query("SELECT * FROM departments");

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
  
      const [budget] = await connection.query("SELECT d.name AS department, SUM(r.salary) AS budget FROM roles r LEFT JOIN departments d ON r.department_id=d.id WHERE d.name=?;", departmentName);
  
      if (budget[0].budget) {
        console.log("");
        console.table(budget);
      }
      else console.log(`\n${departmentName} has no employees. Add employees to view its budget!\n`);
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// Export view department budget function
module.exports = viewDepartmentBudget;