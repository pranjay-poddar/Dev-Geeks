import "./App.css";
import React from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Input from "./components/Input";
import ShortenLink from "./components/ShortenLink";
import { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="h-screen flex flex-col justify-between">
      <Navbar />
      <Input setInputValue={setInputValue} />
      <ShortenLink inputValue={inputValue} />
      <Footer />
    </div>
  );
}

export default App;
