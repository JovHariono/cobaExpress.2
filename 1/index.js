const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/hello", (req, res) => {
    console.log(req.query.name)
    res.send("hello")
})

app.post("/login", (req, res) => {
    console.log(req.body)
  res.send("berhasil dikirim");
});

app.put("/username", (req, res) => {
    console.log(req.body)
    res.send('update berhasil')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
