const mysql = require("mysql");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();  

const db = mysql.createConnection({
  host: process.env.DB_HOST,  // This should read from your .env file
  port: process.env.DB_PORT,  // Ensure you're using the correct port
  user: process.env.DB_USER,  // This should be 'root'
  password: process.env.DB_PASSWORD,  // This should be empty if no password
  database: process.env.DB_NAME  // This should be 'menfess_db'
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Connected to the database.");
  }
});

module.exports = db;
