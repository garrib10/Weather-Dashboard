$(document).ready(function () {
    // Search History Function 
    $("#search-button").on("click", function () {
        var cityName = $("#search-city").val().trim()
        console.log(cityName)
        searchWeather(cityName)
    })
    // Clear History Function 
    $("#clear-button").on("click", function () {
        $(".card").remove();
    })
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
            $("#cityName").text(response.name)
            $("#todayTemp").text("Temperature: " + temp + String.fromCharCode(176) + "F");
            $("#todayHumidity").text("Humidity: " + response.main.humidity + "%");
            console.log(response.main.humidity);
            $("#todayWindSpeed").text("Wind Speed: " + response.wind.speed + "MPH");
            console.log(response.wind.speed);
            $("#today").append(card.append(cardTitle));
            $("#todayIconDiv").attr({
                "src": `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`,
                "height": "100px", "width": "100px"
            });
            //UV Index (Update as time )

            // Add 5 day forecast 
        })




       // 5 Day Forecast (Fix Later, add moment.js to get accurute days )

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=1edce7f1650d0a15296eb7609bbca7a6",
            type: "GET",
            dataType: "json",
        })
            .then(function (response) {
                let day_number = 0;

             
                for (let i = 0; i < response.list; i++) {


                    if (response.list[i].dt_txt.split(" ")[1] == "15:00:00") {
                   
                        let day = response.list[i].dt_txt.split("-")[2].split(" ")[0];
                        let month = response.list[i].dt_txt.split("-")[1];
                        let year = response.list[i].dt_txt.split("-")[0];
                        $("#" + day_number + "date").text(month + "/" + day + "/" + year);
                        let temp = Math.round(((response.list[i].main.temp - 273.15) * 9 / 5 + 32));
                        $("#" + day_number + "five_day_temp").text("Temp: " + temp + String.fromCharCode(176) + "F");
                        $("#" + day_number + "five_day_humidity").text("Humidity: " + response.list[i].main.humidity);
                        $("#" + day_number + "five_day_icon").attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                        console.log(response.list[i].dt_txt.split("-"));
                        console.log(day_number);
                        console.log(response.list[i].main.temp);
                        day_number++;

                    }
                }
            })
    }
})







