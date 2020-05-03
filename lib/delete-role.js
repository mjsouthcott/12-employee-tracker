// Import dependencies
const inquirer = require("inquirer");

// Define delete role function
deleteRole = async (connection) => {
  try {
    const [roles] = await connection.query("SELECT * FROM roles;");

    if (!Array.isArray(roles) || !roles.length) {
      console.log("\nRoles is empty. Add roles!\n");
    } else {
      const roleTitles = roles.map(element => element.title);
  
      const { roleTitle } = await inquirer.prompt({
        type: "list",
        message: "Please select a role:",
        name: "roleTitle",
        choices: roleTitles
      })
  
      await connection.query("DELETE FROM roles WHERE title=?;", roleTitle);
      console.log(`\n${roleTitle} deleted from Roles!\n`);
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// Export delete role function
module.exports = deleteRole;