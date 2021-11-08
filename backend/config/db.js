const mysql = require("mysql")

// Create connexion
const db = mysql.createConnection({
    host     : '127.0.0.1',
    username : 'root',
    password : 'Poupine.123',
    database : "database_development",
    dialect  : "mysql"
    
  });
  
 module.exports.getDB = () => {
     return db
 }