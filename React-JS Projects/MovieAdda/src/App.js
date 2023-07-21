import './App.css';
import Navb from './components/Navbar';
import Slider from './components/Slider';
import { useEffect,useState } from 'react';
import Book from './components/Booking';
import axios from 'axios';
import Item from './components/Item';
import Foot from './components/foot';
import About from './components/about';
import Contact from './components/contact';
import Poster from './components/poster';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Moviedesc from './components/Moviedesc';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

function App() {

  const [mydat,setMyDat]=useState([])
  useEffect(()=>{
      axios.get("https://api.tvmaze.com/shows")
      .then((res)=>setMyDat(res.data));
    },[]);
    var i=1,j=1;
  return (
    <div className="App">
        <Navb/>
        <Router>
          <Routes><Route exact path={`/`} element={<Poster/>}></Route></Routes>
        <Routes><Route exact path={`/about`} element={<About/>}></Route></Routes>
        <Routes><Route exact path={`/contact`} element={<Contact/>}></Route></Routes>
        <Routes><Route exact path={`/`} element={<Slider type="Action"/>}></Route></Routes>
        {mydat.map(dat=>{
                const{score , show}=dat;
                return <Routes><Route exact path={`/Moviedesc${dat.id}`} element={<Moviedesc title={dat.name} page={dat.url} keys={dat.id} imag={dat.image.original} detail={dat.summary} num={i-1}/>}></Route></Routes>
            })};
        <Routes><Route exact path={`/`} element={<Slider type="Horror"/>}></Route></Routes>
        <Routes><Route exact path={`/`} element={<Slider type="Adventure"/>}></Route></Routes>
        <Routes><Route exact path={`/`} element={<Slider type="Science-Fiction"/>}></Route></Routes>
        </Router>
        <div className='contain1'></div>
        <Foot/>
    </div>
  );
}

export default App;
