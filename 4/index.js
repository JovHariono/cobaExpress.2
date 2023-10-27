const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;
const response = require("./response");
const db = require("./connection");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  response(200, "api ready to go", "SUCCESS", res);
});

app.get("/mahasiswa", (req, res) => {
  const sql = "SELECT * FROM mahasiswa";

  db.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields, "mahasiswa get list", res);
  });
});

app.get("/mahasiswa/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM mahasiswa WHERE nim = ${id}`;

  db.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields, `get detail, spesifik by nim ${id}`, res);
  });
});

app.post("/mahasiswa", (req, res) => {
  const { nim, nama_lengkap, kelas, alamat } = req.body;
  const sql = `INSERT INTO mahasiswa (nim, nama_lengkap, kelas, alamat) VALUES (${nim}, "${nama_lengkap}", "${kelas}", "${alamat}")`;

  db.query(sql, (err, fields) => {
    if (err) response(500, "invalid", "error", res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        id: fields.insertId,
      };
      response(200, data, "ini post data", res);
    }
  });
});

app.put("/mahasiswa", (req, res) => {
  const { nim, nama_lengkap, kelas, alamat } = req.body;
  const sql = `UPDATE mahasiswa SET nama_lengkap = '${nama_lengkap}', kelas = '${kelas}', alamat = '${alamat}' WHERE nim = ${nim}`;

  db.query(sql, (err, fields) => {
    if (err) response(500, "invalid", "error", res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        message: fields.message,
      };
      response(200, data, "ini put data", res);
    } else {
      response(404, "user not found", "error", res);
    }
  });
});

app.delete("/mahasiswa", (req, res) => {
  const { nim } = req.body;
  const sql = `DELETE FROM mahasiswa WHERE nim = ${nim}`;

  db.query(sql, (err, fields) => {
    if (err) response(500, "invalid", "error", res);
    if (fields?.affectedRows) {
      const data = {
        isDeleted: fields.affectedRows,
      };
      response(200, data, "ini delete", res);
    } else {
      response(404, "user not found", "error", res);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
