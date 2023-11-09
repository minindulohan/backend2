var sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQlite database.");
    db.run(
      `CREATE TABLE IF NOT EXISTS users10 (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            No INTEGER,
            password TEXT 

      )`,
      (err) => {
        if (err) {
          console.error("Error creating table:", err.message);
          
        } 
      }
    );

    }
  });



  let db2 = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQlite database.");
    db.run(
      `CREATE TABLE IF NOT EXISTS employees2 (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first text,
            last text,
            email text,
            phone INTEGER,
            address text,
            city text,
            state text,
            code INTEGER,
            position text,
            comments text


      )`,
      (err) => {
        if (err) {
          console.error("Error creating table:", err.message);
        
        } 
      }
    );

    }
  });
 
module.exports = db;
