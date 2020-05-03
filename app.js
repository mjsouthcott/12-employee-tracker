// Import dependencies
const mysql = require("mysql2/promise");
const mainMenu = require("./lib/main-menu.js");

const PASSWORD = "example";

let connection;

main = async () => {
  // Greet user
  console.log("Welcome to EmployeeTracker.");
  
  let shouldContinue = true;
  try {
    await connect();
    while (shouldContinue) {
      shouldContinue = await mainMenu(connection);
    }
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
}

// Establish connection to database
connect = async () => {
  connection = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: PASSWORD,
    database: "employee_tracker_db"
  })
  console.log(`Connected as id: ${connection.threadId}`);
}

// Run program
main();
