import React from 'react';
import ReactDOM from 'react-dom';
import './components/style.css';

import Navbar from './components/Navbar';
import Intro from './components/Intro';
import Aboutus from './components/Aboutus';
import Chefs from './components/Chefs';
import Menu from './components/Menu';
import WeekSpecial from './components/Weekspecial';
//import ContactUs from './components/ContactUs';
import Footer from './components/Footer';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Intro />
        <Aboutus />
        <Chefs />
        <Menu />
        <WeekSpecial />
        <Footer />
      </div>
    );
  }
}

export default App;
