import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';

import { Provider } from "react-redux";
import store from "./store";
 
ReactDOM.render(
  <React.StrictMode>
  {/* wrap this app inside the provider */}
  <Provider store={store}>
   <App />
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

