import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.min.css';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';



ReactDOM.render(
  <BrowserRouter>
  
    <App />

  </BrowserRouter>
,
  document.getElementById('root')
);

reportWebVitals();
