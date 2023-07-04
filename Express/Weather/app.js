const express = require("express");
const app = express();
const https = require("https");

app.get("/", function(req, res){

    const url = "https://api.openweathermap.org/data/2.5/weather?q=Riverview&appid=5e3b64b45ad643ca81180ae3fc60308f&units=imperial";
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            res.write("<p>The weather is currently "+ weatherDescription + "</p>");
            res.write("<h1>Your temperature in Riverview is " + temp + " Fahrenheit.</h1>");
            
            res.send();
        })
    });
})


app.listen(3000, function(){
    console.log("Your server is running at local port 3000.");
})