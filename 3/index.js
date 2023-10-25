const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;
const response = require("./response");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  response(200, "ini data", "halaman index", res);
});

app.get("/mahasiswa", (req, res) => {
  response(200, "ini data", "mahasiswa get list", res);
});

app.get("/mahasiswa/:id", (req, res) => {
  const id = req.params.id;
  response(200, "ini data", `spesifik by nim ${id}`, res);
});

app.post("/mahasiswa", (req, res) => {
  response(200, "ini data", "ini post data", res);
});

app.put("/mahasiswa", (req, res) => {
  response(200, "ini data", "ini put data", res);
});

app.delete("/mahasiswa", (req, res) => {
  response(200, "ini data", "ini delete", res)
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
