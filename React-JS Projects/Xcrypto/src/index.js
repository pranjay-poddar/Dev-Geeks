import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ColorModeScript, theme} from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';
import ColorModeSwitcher from './colorModeSwitcher';
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <ColorModeScript />
    {/* theme is default theme that ChakraUI provide */}
    <ChakraProvider theme={theme}> 
      <ColorModeSwitcher />
    <App />
    </ChakraProvider>
    
  </React.StrictMode>
);


export const server = `https://api.coingecko.com/api/v3`; 