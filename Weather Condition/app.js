const express = require("express");
const https = require("https");
//we are using https in order to make request to OpenWeatherMaps's server and
//be able to fetch the  data back as a JSON and parse it.
const bodyParser = require("body-parser");
//  get the text that the user typed into the input, we have to use bodyParser package.
// package that's going to allow us to look through the body of the post request and fetch the data based on the name of my input, which is called cityName for this project.
const app = express();

app.use(bodyParser.urlencoded({extended: true}));//we must write this line for use body-parser.therefore we linked body parser to our app.

app.get("/", function(req,res){

  res.sendFile(__dirname + "/index.html");//when the page got opened from client
  //we response the stuff which is located in index.html such as label,input and button.

});

app.post("/" , function(req, res){

  const query = req.body.cityName; //get variable  from html attribute by using req.body.cityName,cityName = name of input
  const apiKey = "Your Api Key";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey + "&units=" + units;

  https.get(url, function(response){//making a HTTP get request to get the data as a JSON format,
                                    // parsing it and fetching the specific items that we want, and then sending it back to the browser using
                                    // the HTML that we want to write.
                                    
     response.on("data", function(data){//this will correspond to the actual message body that we got back, that OpenWeatherMap has actually
                                        //sent us.
      const weatherData = JSON.parse(data);//Fetch the data back from server as a JSON
      const temp = weatherData.main.temp;//Parse implemantation
      const weatherDescription = weatherData.weather[0].description;//Parse implamentation
      const icon = weatherData.weather[0].icon;
      const tempMin = weatherData.main.temp_min;
      const tempMax = weatherData.main.temp_max;
      const iconURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
      //we got the relevant piece of information and parsed in variables from  OpenWeatherMaps's server
      res.write("<h1>The temperature in "+ query +" is "+ temp +" degrees Celcius.</h1>");
      res.write("<h3>The weather is currently "+ weatherDescription + "</h3>");
      res.write("<p>Minumum degrees: " + tempMin + " and Maximum degrees: "+ tempMax +" for today!</p>")
      res.write("<img src="+ iconURL +">") 
      res.send();
    });
  });
});


app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
