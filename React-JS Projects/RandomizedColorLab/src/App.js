import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
function App() {
  return (
    <div>
    <Layout>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </Layout>
    <Footer/>
    </div>
  );
}

export default App;
