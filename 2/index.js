const express = require("express");
const app = express();
const port = 3000;
const db = require("./connection");
const response = require("./response");

const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  const sql = "SELECT * FROM mahasiswa";

  db.query(sql, (error, result) => {
    //oper ke response.js
    response(200, result, "get all data from mahasiswa", res);
  });
});

app.get("/hello", (req, res) => {
  console.log(req.query.name);
  res.send("hello");
});

app.get("/find", (req, res) => {
  const sql = `SELECT nama_lengkap FROM mahasiswa WHERE nim = ${req.query.nim}`;

  db.query(sql, (error, result) => {
    response(200, result, "find mahasiswa name", res)
  })
  console.log(`find nip: `, req.query.nim);
});

app.post("/login", (req, res) => {
  console.log(req.body);
  res.send("berhasil dikirim");
});

app.put("/username", (req, res) => {
  console.log(req.body);
  res.send("update berhasil");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
