const express = require("express");
require("dotenv").config();

const app = express();
const PORT = 3001 || process.env.PORT;
const fs = require("fs");

//creating a folder to store all files
if (!fs.existsSync("Timefiles")) fs.mkdirSync("Timefiles");

// Create File
app.get("/createFile", (req, res, next) => {
  let date = new Date();
  let fileName = `${date.toISOString()}.txt`;
  fileName = fileName.slice(0, 19).replace(/:/g, "-");

  let data = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${
    date.getHours() >= 12 ? "pm" : "am"
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

// Run server
app.listen(process.env.PORT, () => {
  console.log(`server runnind at port ${PORT}`);
});
