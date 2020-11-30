const express = require("express");
const bodyParser = require("body-parser")
const app = express();
app.use(bodyParser.urlencoded({extended : true}));



app.get("/",(req, res) =>{
  res.sendFile(__dirname + "/index.html"); //being sent to html file and render which is index.html
});

app.post("/",(req,res) =>{ // If there is post method and targetting from route page to server , implement to post method and send it back to route

  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);

  var result = num1 + num2;

  res.send("The result of the calculation is " + result);
});

app.get("/bmicalculator", (req, res) => { //being sent to html file and render which is bmiCalculator.html

  res.sendFile(__dirname + "/bmiCalculator.html");
  
});

app.post("/bmicalculator",(req, res) =>{ // If there is post method and targetting from /bmicalculator page to server , 
                                          //implement to post method and send it back to /bmicalculator

  var weight = parseFloat(req.body.weight); //req.body thanks to body-parser package
  var height = parseFloat(req.body.height);

  var bmi = weight / (height * height);

  res.send("The result of the BMI calculation: " + bmi);
});

app.listen(3000,() => {
  console.log("Server started on port 3000!");
});
