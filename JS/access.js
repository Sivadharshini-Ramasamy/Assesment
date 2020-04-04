/*
    JS file is included for search and display the weather of any perticular city  
    Weather api is used from https://www.weatherapi.com/ and api key is 2016bfbc4e574d87a83201413200104
    Weather app conditions are in https://www.weatherapi.com/docs/weather_conditions.json
***/

$(document).ready(function(){
  $("#accordionList").hide();
  $("#error-handle").hide();

  /*
      Function to append weather data
  **/
  function generateWeather(id, getWeather, getText, getLocation, getCondition, getColour) {
      $("#myCarousel").carousel(id); 
      $("#"+getWeather).text(getLocation);
      $("#"+getText).text(getCondition);
      $("#go").css("background-color",getColour);
  }

  /*
      Searching the city for weather data
  **/

  $("#btnSubmit").click(function(){
      $("#accordionList").hide();
      var getCity=$("#search").val(); 
     /* $("#myCarousel").carousel({
      interval : false
  });*/
  if(getCity == "" || getCity == null || getCity == undefined || $.isNumeric(getCity) || getCity.match(/\d+/g)) {
          $("#error-handle").text("Please Enter Valid City").show();
          $("#go").css("background-color","white");
  } 
  else { 
          $("#error-handle").hide();
          $.get("https://api.weatherapi.com/v1/current.json?key=2016bfbc4e574d87a83201413200104&q="+getCity, function(data, status){
              if(status == "success") {
                  $("#accTitle").text(data.location.name);
                  $("#celsius").text(data.current.temp_c);
                  $("#fahrenheit").text(data.current.temp_f);
                  $("#weatherimg").attr('src', "http:"+data.current.condition.icon);
                  $("#accordionList").show();
                  var code = $.trim(data.current.condition.code);
                  console.log("Status : " +status + "Location : "+ data.location.name +" Text : " + data.current.condition.text + "Code : " + data.current.condition.code);
                  //Sunny - 1009 FFFF99
                  if(code == "1000" ){
                      generateWeather(0,"sunnycity", "sunnytext", data.location.name, data.current.condition.text,"#FFFF99");
                  }
                      //Partly Cloudy - 1003
                      else if(code == "1003") {
                          generateWeather(7,"pcloudycity", "pcloudytext", data.location.name, data.current.condition.text,"#cccccc");
                      }
                      // Cloudy - 1006
                      else if(code == "1006") {
                          generateWeather(3,"cloudycity", "cloudytext", data.location.name, data.current.condition.text,"#999999");
                      }
                      // Overcast - 1009
                      else if(code == "1009") {
                          generateWeather(6,"overcastcity", "overcasttext", data.location.name, data.current.condition.text,"#666666");
                      }
                      // Mist - 1030, Fog - 1135, Freezing fog - 1147
                      else if(code == "1030" || code == "1135") { 
                          generateWeather(5,"mistcity", "misttext", data.location.name, data.current.condition.text,"#f2f2f2");
                      }
                      // Rain - 1063, Drizzle - 1072, Patchy light drizzle - 1150, Light drizzle = 1153, Freezing drizzle - 1168, Heavy freezing drizzle - 1171, Patchy light rain - 1180, Light rain - 1183, Moderate rain at times - 1186, Moderate rain - 1189
                      // Light rain shower - 1240 , Moderate or heavy rain shower - 1243, Torrential rain shower - 1246   
                      else if(code == "1063" || code =="1072" || code =="1150" || code == "1153" || code == "1168" || code == "1183" || code == "1189" || code == "1240" || code == "1243" || code == "1246") { 
                          generateWeather(1,"rainycity", "rainytext", data.location.name, data.current.condition.text,"#b3d9ff");
                      }
                      // Snow - 1066, Blowing snow - 1114,  - Blizzard1117, Patchy light snow - 1210, Light snow - 1213, Patchy moderate snow - 1216, Moderate snow - 1219, Patchy heavy snow - 1222, Heavy snow - 1225
                      else if(code == "1066" || code =="1114" || code == "1117" || code == "1210" || code == "1213" || code == "1216" || code == "1219" || code == "1222" || code == "1225") { 
                        generateWeather(9,"snowcity", "snowtext", data.location.name, data.current.condition.text,"#e6f2ff");
                      }
                      // Sleet - 1069, Light sleet - 1204, Moderate or heavy sleet - 1207, Ice pellets - 1237, Light sleet showers - 1249, Moderate or heavy sleet showers - 1252
                      else if(code == "1069" || code == "1204" || code == "1207" || code == "1237" || code == "1249" || code == "1252") { 
                          generateWeather(8,"sleetcity", "sleettext", data.location.name, data.current.condition.text,"#ffe6cc");
                      }
                      // Thunder - 1087, Patchy light rain with thunder - 1273, Moderate or heavy rain with thunder - 1276, Patchy light snow with thunder - 1279
                      else if(code == "1087" || code == "1273" || code == "1276" || code == "1279") { 
                          generateWeather(10,"thundercity", "thundercity", data.location.name, data.current.condition.text,"#9999ff");
                      }
                      // Heavy rain at times - 1192, Heavy rain - 1195, Light freezing rain - 1198, Moderate or heavy freezing rain - 1201, Moderate or heavy snow with thunder - 1282
                      else if(code == "1192" || code =="1195" || code =="1198" || code == "1201" || code == "1282") { 
                          generateWeather(4,"heavycity", "heavytext", data.location.name, data.current.condition.text,"#1a8cff");
                      }
              }
              else {
                   $("#error-handle").text("Sorry.. Something went wrong!! Please try another city").show();
                   $("#go").css("background-color","white");
              }
  });
  }
  });
      
});