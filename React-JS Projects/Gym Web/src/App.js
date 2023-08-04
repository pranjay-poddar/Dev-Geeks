import './App.css';
import React from 'react';
import Sign from './Components/Sign/Sign';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './Components/Home/Home';

const App=()=> {
  return (
    <div className="App"> 
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Sign />} />
          <Route path='/Home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
