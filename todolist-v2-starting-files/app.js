const express = require("express");
const bodyParser = require("body-parser");
const { static } = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");
const app = express();


// const items = [];//Arrays for store new ToDo Items in root page
// const workItems = []; //Arrays for store new ToDo Items in swork page

app.set('view engine', 'ejs'); // Process of Setting EJS to project


app.use(bodyParser.urlencoded({ extended: true })); // To use body parser , set extended as true
app.use(express.static("public")); // In order to access static files resources by using express static method

mongoose.connect("mongodb://localhost:localhost:27017/todolistDB", {  //connect database which name is given as todolistDB to localhost:27017
  useNewUrlParser: true,
});
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true); 
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

const listSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema]
});

const List = mongoose.model("List",listSchema);

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

app.get("/:customListName", (req, res) => {
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({ name: customListName }, (err, foundList) => {
    if (!err) {
      if (!foundList) {
        // Create a new list
        const list = new List({
          name: customListName,
          items: defaultItems,
        });
        list.save(() => { //save method works async , Redirecting in the callback of the save() funtion ensures that it happens after a successful insert.
          res.redirect(`/${customListName}`);
        });
      } else {
        // Show an existing list
        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.items,
        });
      }
    }
  });
});
app.get('/favicon.ico', (req, res) => res.status(204));
app.post("/", (req, res) => {

  const newItem = req.body.newItem; //Accessing the input from list.ejs by using body parser
  const listName = req.body.list;
  
  const item = new Item({ //This is going to be a new item and this is to show that I'm creating this document
                           //from this model that we specified.
    name: newItem
  });

  if(listName ==="Today"){
    item.save();// this calls the save method in Mongoose to save this item document into a items collection inside our todolistDB.
    res.redirect("/");
  }else{
    List.findOne({name: listName}, (err, foundList) =>{
      foundList.items.push(item);
      foundList.save(() => { //save method works async , Redirecting in the callback of the save() funtion ensures that it happens after a successful insert.
        res.redirect(`/${listName}`);
      });
    });
  }
});

app.post("/delete", (req,res) =>{

  const checkedItemId = req.body.checkbox;

  const listName = req.body.listName;

  if(listName === "Today"){
    Item.findByIdAndRemove(checkedItemId, (err) =>{ // Remove item from database by using its _id 
      (!err) ? console.log("Succesfully deleted checked item.") : console.log("Unsuccesfull process. Could not deleted.");
      res.redirect("/");
    });
  }else{
    List.findOneAndUpdate({name: listName},{$pull: {items: {_id: checkedItemId}}}, (err, foundList) =>{
        if(!err){
          res.redirect(`/${listName}`);
        }
    });
  }
  
});

app.listen(3000, () => {
  console.log("Server is running on 3000 port.");
});
