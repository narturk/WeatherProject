const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendfile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const query = req.body.cityName;
  const apikey = 'fbf07e51cf0045c1734e18c9c9eec192';
  const units = "metric";
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + apikey + '&units=' + units;
  console.log(url);

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weaterDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";

      res.write("<p>The weather is currently " + weaterDescription + "</p>");
      res.write("<h1>The tempreture in " + weatherData.name + " is: " + temp +" Degree Celsius and feels like: " + weatherData.main.feels_like + " Degree Celsius</h1>");
      res.write('<img src="' + imageURL + '" alt="alternatetext">');
      res.send();
    });
  });

});

app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
