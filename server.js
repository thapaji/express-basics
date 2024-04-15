import express from "express";
import path from "path";
import fs from "fs";
const fn = "userList.csv";

const __dirname = path.resolve();
const app = express();

app.get("/resister", (req, res) => {
  res.sendFile(__dirname + "/public/resister.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

app.use(express.urlencoded());

app.post("/login", (req, res) => {
  console.log(res.body);
  const { email, password } = req.body;
  console.log(email, password);
  const loginDetails = email + "," + password;

  //   Reading from the file...........//////////////////

  fs.readFile(fn, (error, data) => {
    const str = data.toString();

    if (str.includes(loginDetails)) {
      return res.send(`<h1 style='color:green'>Login Successfull!!!!</h1>`);
    }
    res.send(`<h1 style='color:red'>Login Unsuccessfull!!!!</h1>`);
  });
});

app.get("/", (req, res) => {
  console.log("sercer received the request");

  //   res.send(`<h1>Home Page</h1>
  //     <a href="/resister"><button>Resister</button></a>
  //     <a href="/login"><button>Login</button></a>`);

  res.sendFile(__dirname + "/public/index.html");
});



app.post("/resister", (req, res) => {
  const { email, password } = req.body;
  const str = email + "," + password + "\n";
  fs.appendFile(fn, str, (error) => {
    console.log(error);
  });

  console.log(req.body);
  res.redirect("/login");
});

app.listen(8000, (error) => {
  error ? console.log(error) : console.log("your server is running at http://localhost:8000");
});
