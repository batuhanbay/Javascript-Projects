const express = require("express");
const bodyParser = require("body-parser");
const { static } = require("express");


const app = express();


let items=[];//Arrays for store new ToDo Items

app.set('view engine', 'ejs'); // Process of Setting EJS to project 


app.use(bodyParser.urlencoded({ extended: true })); // To use body parser , set extended as true
app.use(express.static("public")); // In order to access static files resources by using express static method

app.get("/", (req, res) => {

  const options = {//The object was created in order to use date of format method
    weekday : "long",
    day: "numeric",
    month: "long"
  };
  const today = new Date(); //DateConstructor
  const day = today.toLocaleDateString("en-US",options); //Format the day variable

  res.render("list", { //Rendering process
    kindOfDay: day ,
    newListItems: items
  
  });

});


app.post("/",(req,res) =>{

  var item = req.body.newItem; //Accessing the input from list.ejs by using body parser 
  
  items.push(item);//Push it new Todo item to Array

  res.redirect("/"); //Redirect the given url to root

});


app.listen(3000, () => {
  console.log("Server is running on 3000 port.");
});