import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import "./App.css"
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<AuthPage />} exact />
        <Route path="/home" element={<HomePage />} exact />
      </Routes>
    </div>
  );
}

export default App;
