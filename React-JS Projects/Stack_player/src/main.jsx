import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';
import './index.css'
// Render the application

ReactDOM.createRoot(document.getElementById('root')).render(
<Provider store={store}>
    <App />
  </Provider>,
);

