const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https");

const app = express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res) {
  console.log(req.body)
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const email = req.body.email

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  }

  const jsonData = JSON.stringify(data)

  const url = "https://us2.api.mailchimp.com/3.0/lists/31e4239420";
  const options = {
    method: "POST",
    auth: "anystring:2fd628a18f5727b8526c95e7afa76309-us2"

  }


  const request = https.request(url, options, function(response) {

    if (response.statusCode === 200){
      res.sendFile(__dirname + "/success.html")
    } else {
      res.sendFile(__dirname + "/failure.html")
    }

    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })

  // request.write(jsonData)
  request.end()

})

app.post("/failure", function(req, res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function() {
  console.log("listening on 3000...");
})

// Mail chimp API and list ID
// 2fd628a18f5727b8526c95e7afa76309-us2
// 31e4239420