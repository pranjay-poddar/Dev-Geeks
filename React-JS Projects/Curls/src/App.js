import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home"
import Editor from "./pages/editorPage"
import {Toaster} from "react-hot-toast";
function App() {
  return (
    <>
    <div>
      <Toaster position="top-center" toastOptions={{success:{theme:{primary:'#004aad'}}}}></Toaster>
    </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/editor/:roomId" element={<Editor />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
