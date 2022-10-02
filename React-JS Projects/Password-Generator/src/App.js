import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
  
import Navbar from './component/Navbar';
import Card from './component/chat';
import Password from './component/Password';
import Option from './component/Option';

function App() {
  const [mode, setMode] = useState('light');
  
  const toggleMode=()=>{
    if(mode==='light'){
      setMode('dark');
      document.body.style.backgroundColor = '#212529';
      // document.body.style.color='white';

    }
    else{
      setMode('light');
      document.body.style.backgroundColor = 'white';
      // document.body.style.color='balck';

    }
  }
  
  return (
 <>
 <Navbar color={mode} toggleMode={toggleMode}/>
    {/* <Card color={mode}/> */}
    <Option  />
    <Password color={mode}/>
 </>
  );
}

export default App;
