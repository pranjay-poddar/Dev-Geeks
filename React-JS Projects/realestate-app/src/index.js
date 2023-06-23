import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import HouseContextProvider from './components/HouseContext';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <HouseContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </HouseContextProvider>
  </Router>
);
