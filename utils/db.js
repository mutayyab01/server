// db.js
const sql = require('mssql');
require('dotenv').config();

// Database configuration
const config = {
  // server: process.env.DB_SERVER, // e.g., 'localhost'
  server: process.env.DB_SERVER, // e.g., 'localhost'
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
//   pool: {
//     idleTimeoutMillis: 30000, // Set the connection timeout
//     connectionTimeout: 30000, // Try increasing timeout here
// },
  options: {
    encrypt: true, // Use this if you're on Azure
    trustServerCertificate: true, // Change to false for production
  },
  port:parseInt(process.env.DB_PORT,10),
};
// Function to connect to the database
async function connectToDatabase() {
  try {
    await sql.connect(config);
    // await sql.connect('Server=WINDOWS-I66IPPS,50230;Database=master;User Id=sa;Password=12345678;Encrypt=true;trustServerCertificate=true;')
    // await sql.connect('Server= WINDOWS-I66IPPS\\SQLEXPRESS,50134;User Id= sa;Password= 12345678;');
    console.log('Connected to SQL Server');
  } catch (err) {
    console.error('Database connection failed:', err);
  }
}

module.exports = {
  sql,
  connectToDatabase,
};
