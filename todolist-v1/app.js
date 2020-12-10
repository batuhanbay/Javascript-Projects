const express = require("express");
const bodyParser = require("body-parser");


const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));

const today = new Date();
const currentDay = today.getDay();
let day = "";

app.get("/", (req, res) =>{

  
  switch (currentDay) {
    case 0:
      day = "Sunday"
      break;
    case 1:
      day = "Monday"
      break;
    case 2:
      day = "Tuesday"
      break;
    case 3:
      day = "Weednesday"
      break;
    case 4:
      day = "Thursday"
      break;
    case 5:
      day = "Friday"
      break;
    case 6:
      day = "Saturday"
      break;
  
    default:
      console.log("There is something went wrong!");
      break;
  }
  res.render("list", {kindOfDay: day})

}); 


app.listen(3000,()=>{
   console.log("Server is running on 3000 port.");
});