import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Coins from './components/Coins';
import Exchanges from './components/Exchanges';
import CoinDetails from './components/CoinDetails';
import Footer from './components/Footer';
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={< Home />} /> 
        <Route path="/coins" element={< Coins />} /> 
        <Route path="/exchanges" element={< Exchanges />} /> 
        <Route path="/coin/:id" element={< CoinDetails />} /> 
      </Routes>
      <Footer /> 
    </Router>
  );
}

export default App;
