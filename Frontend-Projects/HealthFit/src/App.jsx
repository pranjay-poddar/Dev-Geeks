import { Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import ExerciseDetail from "./pages/ExerciseDetail"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import "./App.css"

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercise/:id" element={<ExerciseDetail />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
