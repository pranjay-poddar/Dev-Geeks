import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Train from "./pages/Train";
import Admin from "./pages/Admin";
import Chat from "./pages/Chat";

function App() {
  return (
    <BrowserRouter>
      <Navbar>
        <Routes>
          <Route path="/" element={<Train />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Navbar>
    </BrowserRouter>
  );
}

export default App;
