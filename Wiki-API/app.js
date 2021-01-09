
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser:  true});

const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema);


app.get("/articles", (req, res) =>{
  Article.find({}, (err, foundArticles) =>{
    (!err) ?  res.send(foundArticles) : res.send(err);
    
  });
});

app.post("/articles", (req,res) =>{
  
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  })
  newArticle.save((err)=>{
    (!err) ? res.redirect("/") : res.send("Unsuccessfully could not add a new  article.");
  })
});


app.delete("/articles", (req,res) =>{
  Article.deleteMany({}, err =>{
    (!err) ? res.send("Succesfully deleted all articles.") : res.send(err);
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});