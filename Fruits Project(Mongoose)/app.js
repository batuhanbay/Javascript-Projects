const mongoose = require('mongoose');//require mongoose package

mongoose.connect("mongodb://localhost:27017/fruitsDB",{useNewUrlParser: true}); //connect database which name is given as fruitsDb to localhost:27017
                                                                                 
const fruitSchema = new mongoose.Schema({ //this layout the foundation for every new fruit document that will be added to our database
  name: String,
  rating: Number,
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema ); //The first parameter is going to be the name of the collection that is going to comply with this particular schema.
//If we would like to have a collection of fruits then inside here will be the word "Fruit" in a singular form. And Mongoose will convert this string into a pluralize form to create our collection.
//By doing this it will have created a new collection called fruits and those fruits have to stick to 
//the structure that we've specified in the fruit schema.

const fruit = new Fruit({ //This is going to be a new Fruit and this is to show that I'm creating this document
                          //from this model that we specified up here.
  name:"Apple",
  rating: 7,
  review: "Pretty solid as a fruit."
});

fruit.save();//And this calls the save method in Mongoose to save this fruit document into a fruit collection inside our fruitsDB.

// Relationships and embedding documents
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema,
});

const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit({
  name: "Pineapple",
  score: 9,
  review: "Great fruit.",
});

// pineapple.save();

const person = new Person({
  name: "John",
  age: 37,
  favouriteFruit: pineapple,
});

// person.save();

const mango = new Fruit({
  name: "Mango",
  score: 6,
  review: "Decent fruit.",
});

// mango.save();

Person.updateOne({ name: "John" }, { favouriteFruit: mango }, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Succesfully updated the documents");
  }
});

// Create many documents
const kiwi = new Fruit({
  name: "Kiwi",
  rating: 10,
  review: "The best fruit!",
});

const orenge = new Fruit({
  name: "orenge",
  rating: 4,
  review: "Too sour for me",
});

const banana = new Fruit({
  name: "Banana",
  rating: 3,
  review: "Weird texture",
});

// Fruit.insertMany([kiwi, orenge, banana], (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Succesfully saved all the fruits to fruitDB");
//   }
// });

// Read all documents
Fruit.find((err, fruits) => {
  if (err) {
    console.log(err);
  } else {
    mongoose.connection.close();
    console.log(fruits);
    fruits.forEach((element) => {
      console.log(element.name);
    });
  }
});

// Update one document
Fruit.updateOne(
  { _id: "5fea43a67013833d80e9aec7" },
  { name: "Peach" },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Succesfully updated the document.");
    }
  }
);

// Delete one document
// Fruit.deleteOne({ _id: "5fea43a67013833d80e9aec7" }, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Succesfully deleted the document.");
//   }
// });

// Delete all documents
// Person.deleteMany({ name: "John" }, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Succesfully deleted all the document.");
//   }
// });