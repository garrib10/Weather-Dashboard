$(document).ready(function () {

    $("#search-button").on("click", function () {
        var cityName = $("#search-city").val().trim()
        console.log(cityName)
        searchWeather(cityName)
     //Clear Search button 



    })
    // Add Clear History Button 

    function searchWeather(city) {
        $.ajax({
            type: "get",
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=1edce7f1650d0a15296eb7609bbca7a6",
            dataType: "json",
        }).then(function (response) {
            console.log(response)
            var card = $("<div>").addClass("card");
            var cardTitle = $("<h1>").addClass("card-title").text(response.name)
           
            // Temp, Humidity, Wind Speed, and UV Index(need to add)
            let temp = Math.round(((response.main.temp - 273.15) * 9 / 5 + 32))
            console.log("The temperature in " + city + " is: " + temp);
            $("#cityName").text(response.name);
            $("#todayTemp").text("Temperature: " + temp + String.fromCharCode(176) + "F");
            $("#todayHumidity").text("Humidity: " + response.main.humidity + "%");
            console.log(response.main.humidity);
            $("#todayWindSpeed").text("Wind Speed: " + response.wind.speed + "MPH");
            console.log(response.wind.speed);
            $("#today").append(card.append(cardTitle));
            //UV Index
            let lat = response.coord.lat;
            let lon = response.coord.lon;
            let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=1edce7f1650d0a15296eb7609bbca7a6 ";
        
            // Add 5 day forecast 
        })
        
  



}













})
