import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = "800b3bf4a035fed57ece348766f8c63d";

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="weather">
      <h2>Enter your city to check the weather</h2>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City name"
      />
      <button onClick={fetchWeather}>Check Weather</button>

      {weatherData && (
        <div className="weather-result">
          <h3>{weatherData.name}</h3>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
