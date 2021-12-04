// Define app using express
var express = require("express");
var app = express();
// Require database SCRIPT file
var db = require("./database.js");
var words = require("./words.js");
// Require md5 MODULE
var md5 = require("md5");
const cors = require("cors");
var multer = require("multer");
let upload = multer();
var fs = require("fs");

//add require /words.js

// Make Express use its own built-in body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Set server port
var HTTP_PORT = 5000;
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT));
});
// READ (HTTP method GET) at root endpoint /app/
app.get("/app/", (req, res, next) => {
    res.json({"message":"Your API works! (200)"});
	res.status(200);
});

// Define other CRUD API endpoints using express.js and better-sqlite3

app.get("/app/users/scores", (req, res) => {
    const stmt = db.prepare("SELECT * FROM userinfo ORDER BY score DESC LIMIT 10").all();
    res.status(200).json(stmt);
})

// CREATE a new user (HTTP method POST) at endpoint /app/new/
app.post("/app/new/", (req, res) => {	
	const stmt = db.prepare("INSERT INTO userinfo (user, pass) VALUES (?, ?)").run(req.body.user, md5(req.body.pass));
	res.json({"message":`1 record created: ID ${stmt.lastInsertRowid} (201)`});
	res.status(201);
});

app.post("/app/new/user", (req, res, next) => {	
	var data = {
		user: req.body.user,
		pass: req.body.pass ? md5(req.body.pass) : null
	}
	const stmt = db.prepare("INSERT INTO userinfo (user, pass) VALUES (?, ?)");
	const info = stmt.run(data.user, data.pass);
	res.json({"message": info.changes+`1 record created: ID ${stmt.lastInsertRowid} (201)`});
	res.status(201);
});

// READ a list of all users (HTTP method GET) at endpoint /app/users/
app.get("/app/users/", (req, res) => {	
	const stmt = db.prepare("SELECT * FROM userinfo").all();
	res.status(200).json(stmt);
});

// READ a single user (HTTP method GET) at endpoint /app/user/:id
app.get("/app/user/:id", (req, res) => {
	const stmt = db.prepare(`SELECT * FROM userinfo WHERE id = ${req.params.id}`).get();
	res.status(200).json(stmt);
});

// CHECK if user already exists, if it does, re-login
app.get("/app/user/:user", (req, res) => {
	const stmt = db.prepare(`SELECT * FROM userinfo WHERE user = ${req.params.user}`).get();
	res.status(200).json(stmt);
}); 
// UPDATE a single user (HTTP method PATCH) at endpoint /app/update/user/:id
app.patch("/app/update/user/:id", (req, res) => {	
	var user = req.body.user;
	var pass = md5(req.body.pass);
	const stmt = db.prepare("UPDATE userinfo SET user = COALESCE(?, user), pass = COALESCE(?, pass) where id = ?").run(user, pass, req.params.id);
	res.json({"message":`1 record updated: ID ${req.params.id} (200)`});
	res.status(200);
});

// DELETE a single user (HTTP method DELETE) at endpoint /app/delete/user/:id
app.delete("/app/delete/user/:id", (req, res) => {	
	const stmt = db.prepare("DELETE FROM userinfo WHERE id = ?").run(req.params.id);
	res.json({"message":`1 record deleted: ID ${req.params.id} (200)`});
	res.status(200);
});

app.get("/app/word/", (req, res) => {
    let data = fs.readFileSync('./words.json', 'utf-8');
    let words = JSON.parse(data.toString());
    res.status(200).json({"message": words.words[Math.floor(Math.random() * (words.words.length - 1))]});
});



// Default response for any other request
app.use(function(req, res){
	res.json({"message":"Error!"});
    res.status(404); 
}); 