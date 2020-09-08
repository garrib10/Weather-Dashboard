$(document).ready(function () {

    $("#search-button").on("click", function () {
        var cityName = $("#search-city").val().trim()
        console.log(cityName)


        searchWeather(cityName)




    })


    function searchWeather(city) {
        $.ajax({
            type: "get",
            url: "https://api.openweathermap.org/data/2.5/weather?q=" +city + "&appid=1edce7f1650d0a15296eb7609bbca7a6",
            dataType: "json",
        }).then(function(response){
         console.log(response)
        var card =$("<div>").addClass("card");
        var cardTitle =$("<h1>").addClass("card-title").text(response.name)
        $("#today").append(card.append(cardTitle))
        })




    }













})
