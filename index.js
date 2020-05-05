// Import dependencies
const mysql = require("mysql2/promise");
const logo = require("asciiart-logo");
const mainMenu = require("./lib/main-menu");

// Define and initialize variables
const PASSWORD = "example";
let connection;

// Define main function
main = async () => {
  // Display logo
  console.log(
    logo({
        name: 'Employee Tracker',
        font: "Lean",
        lineChars: 10,
        padding: 2,
        margin: 3,
        borderColor: 'white',
        logoColor: 'bold-white',
        textColor: 'white',
    })
    .emptyLine()
    .right('version 1.0.0')
    .render()
);
  
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
  console.log(`Connected as id: ${connection.threadId}.`);
}

// Run program
main();
