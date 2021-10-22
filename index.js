const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;
const fs = require("fs");

//creating a folder to store all files
if (!fs.existsSync("Timefiles")) fs.mkdirSync("Timefiles");

// Create File
app.get("/createFile", (req, res, next) => {
  let date = new Date();
  let fileName = `${date.toISOString()}.txt`;
  fileName = fileName.slice(0, 19).replace(/:/g, "-");

  let data = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${
    date.getHours() >= 12 ? "PM" : "AM"
  }`;

  fs.writeFileSync(`./Timefiles/${fileName}.txt`, data, (err) => {
    if (err) console.log(err);
  });
  res.send("File Created");
});

//Retrieve the data
app.get("/getFile", (req, res) => {
  let storage = fs.readdirSync("./Timefiles");
  res.send(storage.sort());
});
app.get("/", (req, res) => {
  res.send(`Use url/createFile to create file  
            and
            url/getFile to get file`);
});

// Run server
app.listen(port, () => {
  console.log(`server runnind at port ${port}`);
});
