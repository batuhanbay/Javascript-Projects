//jshint esversion:6
const express = require("express");

const bodyParser = require("body-parser");

const ejs = require("ejs");



const app = express();



app.use(express.static("public"));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({

  extended: true

}));


app.get("/", (req,res) =>{
  res.render("home");
});
app.get("/login", (req,res) =>{
  res.render("login");
});
app.get("/register", (req,res) =>{
  res.render("register");
});

app.listen(3000,()=>{
  console.log("Server is running on port 3000");
});