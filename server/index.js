const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "AsDfGh12!",
  database: "ContactListDataBase",
});

// Get all contacts
app.get("/api/get", (req, res) => {
  const limit = req.query.limit || 5;
  const offset = req.query.offset || 0;
  const sqlSelect = "SELECT * FROM contacts LIMIT ? OFFSET ?";
  db.query(sqlSelect, [limit, offset], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Insert a new contact
app.post("/api/insert", (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;

  const sqlInsert =
    "INSERT INTO contacts (contactName, contactPhone, contactEmail) VALUES (?, ?, ?)";
  db.query(sqlInsert, [name, phone, email], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Values inserted");
    }
  });
});

// Update a contact
app.put("/api/update/:id", (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;

  const sqlUpdate =
    "UPDATE contacts SET contactName = ?, contactPhone = ?, contactEmail = ? WHERE id = ?";
  db.query(sqlUpdate, [name, phone, email, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Contact updated");
    }
  });
});

// Delete a contact
app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM contacts WHERE id = ?";
  db.query(sqlDelete, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Contact deleted");
    }
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
