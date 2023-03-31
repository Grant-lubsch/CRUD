const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "AsDfGh12!",
  database: "ContactListDataBase",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM contacts";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  console.log("in api/insert");

  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;

  const sqlInsert =
    "INSERT INTO contacts (contactName, contactPhone, contactEmail) VALUES (?,?,?)";
  db.query(sqlInsert, [name, phone, email], (err, result) => {
    console.log(result);
  });
  console.log("done insert");
});

app.listen(3001, () => {
  console.log("runnning on port 3001");
});
