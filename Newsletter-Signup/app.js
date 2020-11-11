const express = require("express");
const bodyParser = require("body-parser");
//  get the text that the user typed into the input, we have to use bodyParser package.
// package that's going to allow us to look through the body of the post request and fetch the data based on the name of my input, which is called cityName.
const request = require("request");

const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));//we must write this line for use body-parser.therefore we linked body parser to our app.

app.use(express.static("public"));//providing the path of our static files, then we should be able to
                                  //refer to these static files by a relative URL, and that is relative to the public folder.
                                //  you can see that all of those static files, the CSS and the images
                                  //are now able to be rendered all because of this one line of code that specifies a static folder where
                                  //we have all of those files.


app.get("/", function(req, res){

  res.sendFile(__dirname+"/signup.html")
});

app.post("/", function(req, res){

  const firstName = req.body.firtNamehtml;
  const lastName = req.body.lastNamehtml;
  const emailAdress = req.body.emailAdresshtml;
  const data = {
    members : [
      {
        email_adress:emailAdress,
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
       }
      ]
    }
    console.log("emailAdress: " + emailAdress);
    console.log("email_adress: " + data.members[0].email_adress);
    console.log("firstName: "+ firstName);
    console.log("lastName: "+ lastName);

    const jsonData = JSON.stringify(data);//This is what we're going to send to MailChimp and we're ready for the next step which is to make our request.
    console.log("jsonData:"+ jsonData);
    const url = "https://us18.api.mailchimp.com/3.0/lists/fdf4fcbc3c";
    const options = {
      method:"POST",
      auth: "batuhan:ace5937bda4690822ee88ec270473bdb-us18"
    }

    const request1 = https.request(url,options, function(response){
      response.on("data", function(data){
        console.log(JSON.parse(data));
      });
    });

    request1.write(jsonData);
    request1.end();
});

app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});


//API Key
//ace5937bda4690822ee88ec270473bdb-us18


//LIST id
//fdf4fcbc3c
