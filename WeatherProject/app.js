const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res) {
  var city = req.body.cityName;
  var apiKey = "b3d9fab385dd44693f9946e5fa72567f"
  var units = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units="+ units;

  https.get(url, function(responce) {
    console.log(responce.statusCode);
    responce.on("data", function(data) {
      var weatherData = JSON.parse(data);
      var temp = weatherData.main.temp;
      var feelsLike = weatherData.main.feels_like;
      var icon = weatherData.weather[0].icon;
      var icon_url = "http://openweathermap.org/img/wn/" + icon + "@4x.png";
      res.write("<p>The temp feels like: " + feelsLike + " degrees</p>");
      res.write("<h1>The temp in " + city + " is " + temp + " degrees</h1>");
      res.write("<img src=" + icon_url + ">")
      res.send();
    })
  });
})

app.listen(3000, function() {
  console.log("Starting on port 3000...")
});



//
