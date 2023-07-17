import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import store from './State';
import { Provider } from "react-redux"
import { ChakraProvider } from '@chakra-ui/react'
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist"

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistStore(store)}>
      <ChakraProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </PersistGate>
  </Provider>
)
