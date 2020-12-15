const express = require("express");
const bodyParser = require("body-parser");
const { static } = require("express");
const date = require(`${__dirname}/date.js`);
const app = express();


const items = [];//Arrays for store new ToDo Items in root page
const workItems = []; //Arrays for store new ToDo Items in work page

app.set('view engine', 'ejs'); // Process of Setting EJS to project 


app.use(bodyParser.urlencoded({ extended: true })); // To use body parser , set extended as true
app.use(express.static("public")); // In order to access static files resources by using express static method

app.get("/", (req, res) => {

  let day = date.getDay();

  res.render("list", { //Rendering process
    listTitle: day,
    newListItems: items

  });

});

app.get("/work", (req, res) => {

  res.render("list", {
    listTitle: "Work",
    newListItems: workItems
  }
  );

});


app.post("/", (req, res) => {

  let item = req.body.newItem; //Accessing the input from list.ejs by using body parser 

  if (req.body.button === "Work") { //Check the post request where it's coming
    workItems.push(item);//Push it new Todo item to Array for /work page
    res.redirect("/work"); //Redirect the given url to root
  } else {
    items.push(item);//Push it new Todo item to Array
    res.redirect("/"); //Redirect the given url to root
  }

});


app.post("/work", (req, res) => {
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server is running on 3000 port.");
  console.log(date);
});