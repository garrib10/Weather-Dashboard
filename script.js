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
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=1edce7f1650d0a15296eb7609bbca7a6&units=imperial",
            dataType: "json",
        }).then(function (response) {
            // Fix Moment for Card (#today puts it back in column)
            var currentDate = moment().format('l');
            var temp = Math.round(response.main.temp);
            console.log(response)
            var space = " ";
            var card = $("<div>").addClass("card");
            var cardBody = $("<div>").addClass("card-body");
            var cardTitle = $("<h1>").addClass("card-title").text(response.name);
            var tempDisplay = $("<h2>").addClass("card-text").text("Temperature: " + temp + String.fromCharCode(176) + "F");
            var humidityDisplay = $("<h3>").addClass("card-text").text("Humidity: " + response.main.humidity + "%");
            var windspeedDisplay = $("<h4>").addClass("card-text").text("Wind Speed: " + response.wind.speed + "MPH");
            var imageIcon = $("<img>").addClass("card-image").attr({
                "src": `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`,
                "height": "100px", "width": "100px",


            })
            // Add currentDate to cardTitle with space between image Icon
            cardTitle.append(space, currentDate, imageIcon)

            cardBody.append(cardTitle, tempDisplay, humidityDisplay, windspeedDisplay);
            card.append(cardBody);
            //Fix this (change the div class to get it to work )
            $("#today").append(card);

            getForecast(response.coord.lat, response.coord.lon)


        });

        //UV Index (Update as time )
        // 5-Day Forecast 
        function getForecast(lat, lon) {
            $.ajax({
                type: "get",
                dataType: "JSON",
                url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=1edce7f1650d0a15296eb7609bbca7a6&units=imperial`,

            }).then(function (weatherData) {
                console.log(lat, lon)

                for (var i = 1; i < 6; i++) {
                    console.log(weatherData.daily[i])
                    var day = weatherData.daily[i];

                }
                var date = moment().unix(day.dt);

                


                var dayCard = $("<div>");

                dayCard.addClass("card col-md-5 daycard");
                dayCard.css("background-color", "blue");
                dayCard.css("font-size", "15px");

                var dayCardBody = $("<div>");
                dayCardBody.addClass("card-body");
                dayCard.append(dayCardBody);

                var dayCardName = $("<h6>");
                dayCardName.addClass("card-title");
               
                dayCardBody.append(dayCardName);
                // Weather Icon 
                var weatherIcon = $("<img>");
                var iconCode = weatherData.weather;
                var iconUrl = `http://openweathermap.org/img/wn/${weatherData.weather}@2x.png`;
                weatherIcon.attr("src", iconUrl);
                var dayTemp = $("<p>").addClass("Temperature: " + weatherData.temp + String.fromCharCode(176) + "F");
                var dayHumidity = $("<p>").addClass("card-text").text("Humidity: " + weatherData.main.humidity + "%");
                dayCardBody.append(weatherIcon,iconCode, dayTemp, dayHumidity);
                //Moment Js using (DT parameters)











            })
        }
    }
            





        
    











})




