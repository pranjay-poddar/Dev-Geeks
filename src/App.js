import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Menu from './Components/Menu';
import Products from './Components/Products';
import Reviewers from './Components/Reviewers';
import Contact from './Components/Contact';
import Footer from './Components/Footer';

function App() {
  return (
    <>
   <Navbar/>
   <Home/>
   <About/>
   <Menu/>
   <Products/>
   <Reviewers/>
   <Contact/>
   <Footer/>
   </>
  );
}

export default App;