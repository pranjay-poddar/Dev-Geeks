import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Container/Login';
import Register from './Container/Register';
import NotFound from './Container/NotFound';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Login}></Route>
          <Route path="/register" Component={Register}></Route>
          <Route path="*" Component={NotFound}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
