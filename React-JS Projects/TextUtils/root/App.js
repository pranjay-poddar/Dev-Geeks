// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import TextFrom from './Components/TextFrom';
// import About from './Components/About';

function App() {
  const [mode, setMode] = useState('light')
  const toggleMode = () => {
    if(mode === 'light'){
      setMode('dark')
      document.body.style.backgroundColor='#042743'
      document.title='TextUtils - Dark Mode'
    }else{
      setMode('light')
      document.body.style.backgroundColor='white'
      document.title='TextUtils - Home'
    }
  }
  return (
    <>
      <Navbar title="TextUtils" About="About" mode={mode} toggleMode={toggleMode}>
      </Navbar>
      <div className="container">
        <TextFrom headline="Enter the text that you want to check" mode={mode}/>
      </div>
    </>
  );
}

export default App;
