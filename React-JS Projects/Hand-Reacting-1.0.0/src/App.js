import React from 'react';
// import {BrowserRouter as Router} from 'react-router-dom'
import './App.css';
import FontConverter from './Components/FontConverter/FontConverter';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Info from './Components/Info/Info';
import SpeechToText from './Components/SpeechToText/SpeechToText';
import TesseractScan from './Components/TesseractScan/TesseractScan';


function App() {
  return (
    <div className="App">
        <Header />
        <Info />
        <FontConverter />
        <TesseractScan />
        <SpeechToText />
        <Footer />
    </div>
  );
}

export default App;
