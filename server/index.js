const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA_CONTACTS || "ContactListDataBase",
});

app.use(cors());
app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Get all contacts
app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM contacts";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

// Insert a new contact
app.post("/api/insert", (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;

  const sqlInsert =
    "INSERT INTO contacts (contactName, contactPhone, contactEmail) VALUES (?,?,?)";
  db.query(sqlInsert, [name, phone, email], (err, result) => {
    console.log(result);
    res.send("Contact added successfully!");
  });
});

// Update an existing contact
app.put("/api/update/:id", (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;

  const sqlUpdate =
    "UPDATE contacts SET contactName=?, contactPhone=?, contactEmail=? WHERE id=?";
  db.query(sqlUpdate, [name, phone, email, id], (err, result) => {
    console.log(result);
    res.send("Contact updated successfully!");
  });
});

// Delete an existing contact
app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM contacts WHERE id=?";
  db.query(sqlDelete, id, (err, result) => {
    console.log(result);
    res.send("Contact deleted successfully!");
  });
});

var myPort = process.env.PORT || 3001;

app.listen(myPort, () => {
  console.log("Server running on port " + myPort);
});
