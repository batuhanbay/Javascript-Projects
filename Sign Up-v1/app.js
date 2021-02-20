const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const client = require("@mailchimp/mailchimp_marketing");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", (req, res) => {

  res.sendFile(__dirname + "/signup.html");

});


app.post("/", (req, res) => {

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  const adress = req.body.adress;

  client.setConfig({
    apiKey: "your api key",
    server: "server-prefix"
  });

  const run = async () => {
    try{
      const response = await client.lists.batchListMembers("your list id", {
        members : [{
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName,
            ADRESS: adress
          }
        }]
      });
      //console.log(response);
      console.log(`Successfully added contact as an audience member. The contact's id is ${response.id}.`);
      res.sendFile(__dirname + "/success.html");
    } catch (e) {
      if (e.status === 404) {
        console.error(`This email is not subscribed to this list`, e);
        res.sendFile(__dirname + "/failure.html");
      }
    } 
  };
  run();
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});