const express = require("express");
const bodyParser = require("body-parser");
const { static } = require("express");
const mongoose = require("mongoose");
const app = express();


// const items = [];//Arrays for store new ToDo Items in root page
// const workItems = []; //Arrays for store new ToDo Items in swork page

app.set('view engine', 'ejs'); // Process of Setting EJS to project


app.use(bodyParser.urlencoded({ extended: true })); // To use body parser , set extended as true
app.use(express.static("public")); // In order to access static files resources by using express static method

mongoose.connect("mongodb://localhost:localhost:27017/todolistDB", {  //connect database which name is given as todolistDB to localhost:27017
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const itemsSchema = new mongoose.Schema({//this layout the foundation for every new item document that will be added to our database
  name: String
});

const Item = mongoose.model("Item", itemsSchema); //The first parameter is going to be the name of the collection that is going to comply with this particular schema. 


const item1 = new Item({
  name: "Welcome to your todoList."
});
const item2 = new Item({
  name: "Hit the + button to add a new item."
});
const item3 = new Item({
  name: "<-- Hit the this to delete an item"
});

const defaultItems = [item1, item2, item3];


app.get("/", (req, res) => {

  // Read all documents
  Item.find({}, (err, foundItems) => {
    if (foundItems.length === 0) {
      // Insert many documents
      Item.insertMany(defaultItems, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Succesfully saved all the items to DB.");
        }
        res.redirect("/");
      });
    } else {
      //render process 
      res.render("list", { listTitle: "Today", newListItems: foundItems });
    }
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

  const newItem = req.body.newItem; //Accessing the input from list.ejs by using body parser

  const item = new Item({ //This is going to be a new item and this is to show that I'm creating this document
                           //from this model that we specified.
    name: newItem
  });

  item.save();// this calls the save method in Mongoose to save this item document into a items collection inside our todolistDB.

  res.redirect("/");

  // if (req.body.button === "Work") { //Check the post request where it's coming
  //   workItems.push(item);//Push it new Todo item to Array for /work page
  //   res.redirect("/work"); //Redirect the given url to root
  // } else {
  //   items.push(item);//Push it new Todo item to Array
  //   res.redirect("/"); //Redirect the given url to root
  // }

});


app.post("/work", (req, res) => {
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server is running on 3000 port.");
});
