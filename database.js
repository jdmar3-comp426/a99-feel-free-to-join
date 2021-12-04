// This ensures that things do not fail silently but will throw errors instead.
"use strict";
// Require better-sqlite.
const Database = require('better-sqlite3');

// Connect to a database or create one if it doesn't exist yet.
const db = new Database('user.db');

// Is the database initialized or do we need to initialize it?
const stmt = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='userinfo';`);
let row = stmt.get();
if (row === undefined) {
// Echo information about what you are doing to the console.
    console.log('Your database appears to be empty. I will initialize it now.');
// Set a const that will contain your SQL commands to initialize the database.
const sqlInit = `
        CREATE TABLE userinfo ( id INTEGER PRIMARY KEY, user TEXT, pass TEXT, date TEXT, score INTEGER);
        INSERT INTO userinfo (user, pass, date, score) VALUES 
        ('player1', 'aaa', '2021/06/03', 2), 
        ('player2', 'bbb', '2021/07/23', 5),
        ('player3', 'ccc', '2021/11/25', 10), 
        ('player4', 'ccc', '2021/12/03', 1), 
        ('player5', 'ccc', '2021/01/04', 2),
        ('player6', 'ccc', '2021/10/20', 6),
        ('player7', 'ccc', '2021/11/20', 6),
        ('player8', 'ccc', '2021/08/20', 9),
        ('player9', 'ccc', '2021/1/20', 16),
        ('player10', 'ccc', '2021/04/20', 30),
        ('player11', 'ccc', '2021/05/20', 20)
`;
// Execute SQL commands that we just wrote above.
    db.exec(sqlInit);
// Echo information about what we just did to the console.
    console.log('Your database has been initialized with a new table and 11 entries containing a username, and password');
} else {
// Since the database already exists, echo that to the console.
    console.log('Database exists.');
}
// Export all of the above as a module so that we can use it elsewhere.
module.exports = db;
