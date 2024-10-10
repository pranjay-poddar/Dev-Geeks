import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Weather App</h1>
      <h2>
        Get The Latest <span className="weather-text">Weather</span> Info Of
        Your City
      </h2>
      <button>CHECK NOW</button>
    </div>
  );
};

export default Home;
