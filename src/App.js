import React, { useState } from "react";
import "./App.css";

const App = () => {
  const apiKey = "c57bb2610f0c11fb90388f14ba3a0c38";
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState("");

  const getWeather = (event) => {
    if (event.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
          setCity("");
        });
    }
  };

  return (
    <div className="container">
      <input
        className="input"
        placeholder="Enter city name"
        onChange={(e) => setCity(e.target.value)}
        value={city}
        onKeyDown={getWeather}
      />

      {typeof weatherData.main === "undefined" ? (
        <div>
          <p>
            Welcome to weather app! Enter in a city to get the weather of, then
            press enter.
          </p>
        </div>
      ) : (
        <div className="weather-data">
          <p className="city">Weather in {weatherData.name}</p>
          <p className="temp">{Math.round(weatherData.main.temp)}°C</p>
          <p className="weather">{weatherData.weather[0].main}</p>
        </div>
      )}

      {weatherData.cod == 404 && <p>City not found</p>}
    </div>
  );
};

export default App;
