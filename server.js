import express from "express";
import path from "path";
import fs from "fs";
const fn = 'userList.csv';

const __dirname = path.resolve();
const app = express();

app.get("/resister", (req, res) => {
  res.sendFile(__dirname + "/public/resister.html");
});

app.get("/", (req, res) => {
  console.log("sercer received the request");

  //   res.send(`<h1>Home Page</h1>
  //     <a href="/resister"><button>Resister</button></a>
  //     <a href="/login"><button>Login</button></a>`);

  res.sendFile(__dirname + "/public/index.html");
});

app.use(express.urlencoded());

app.post("/resister", (req, res) => {
  const { email, password } = req.body;
  const str = email + "," + password+'\n';
  fs.appendFile(fn, str, (error) => {
    console.log(error);
  });

  console.log(req.body);
  res.send("Data Received");
});

app.listen(8000, (error) => {
  error ? console.log(error) : console.log("your server is running at http://localhost:8000");
});
