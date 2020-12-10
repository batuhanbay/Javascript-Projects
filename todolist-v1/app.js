const express = require("express");
const bodyParser = require("body-parser");


const app = express();


app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) =>{

  const today = new Date();
  today.getDay() === 6 || today.getDay() === 0 ? res.sendFile(`${__dirname}/weekend.html`) : res.sendFile(`${__dirname}/weekday.html`);

}); 


app.listen(3000,()=>{
   console.log("Server is running on 3000 port.");
});