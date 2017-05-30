var t,SQL,db;

t = Date.now();
SQL = require("./js/sql.js");
console.log("Require: %d ms", Date.now()-t);

t = Date.now();
db = new SQL.Database();
console.log("Empty database creation: %d ms", Date.now()-t);

t = Date.now();
db.run("CREATE TABLE simpletable(id INTEGER PRIMARY KEY, name VARCHAR, data BLOB)");
console.log("Create table: %d ms", Date.now()-t);

t = Date.now();
db.run("INSERT INTO simpletable (name,data) VALUES (?, ?)", ["Jack", 42]);
console.log("INSERT: %d ms", Date.now()-t);

t = Date.now();
db.exec("SELECT * FROM simpletable WHERE name = 'Jack'");
console.log("SELECT: %d ms", Date.now()-t);
