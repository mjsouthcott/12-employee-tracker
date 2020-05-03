// Import dependencies
const inquirer = require("inquirer");
const cTable = require("console.table")

// Define view department budget function
viewDepartmentBudget = async (connection) => {
  try {
    const [departments] = await connection.query("SELECT * FROM departments")
    const departmentNames = departments.map(element => element.name)

    const { departmentName } = await inquirer.prompt({
      type: "list",
      message: "Please select a department:",
      name: "departmentName",
      choices: departmentNames
    })

    const departmentId = departments.find(element => element.name === departmentName).id;

    const [budget] = await connection.query("SELECT d.name AS department, SUM(r.salary) AS budget FROM roles r LEFT JOIN departments d ON r.department_id=d.id WHERE r.department_id=?;", departmentId);
    console.log("");
    console.table(budget);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// Export view department budget function
module.exports = viewDepartmentBudget;