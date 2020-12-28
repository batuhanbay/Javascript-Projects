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