import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Weather from "./components/Weather";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Home />
      <Weather />
    </div>
  );
};

export default App;
