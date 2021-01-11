
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

mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true });

const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema);

////////////////////Requests Targetting All The Articles //////////////////////

app.route("/articles")

  .get((req, res) => {
    Article.find({}, (err, foundArticles) => {
      (!err) ? res.send(foundArticles) : res.send(err);
    });
  })

  .post((req, res) => {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    })
    newArticle.save((err) => {
      (!err) ? res.redirect("/") : res.send("Unsuccessfully could not add a new  article.");
    })
  })

  .delete((req, res) => {
    Article.deleteMany({}, err => {
      (!err) ? res.send("Succesfully deleted all articles.") : res.send(err);
    });
  });
////////////////////Requests Targetting a Specific Articles //////////////////////

app.route("/articles/:articleTitle")

.get((req,res) =>{
  Article.findOne({title: req.params.articleTitle}, (err, foundArticle)=>{
    (foundArticle) ? res.send(foundArticle) : res.send("No articles matching that title was found.");
  });
}); 

app.listen(3000, function () {
  console.log("Server started on port 3000");
});