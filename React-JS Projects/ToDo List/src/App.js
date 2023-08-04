import React, { Component } from "react";
import "./App.css";
import Login from "./components/login";
import ToDoPage from "./components/todo_page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// making app class 
class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <Routes>
            {/* setting up routes */}
            <Route path="" element={<Login />} />
            <Route path="todo-page" element={<ToDoPage />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;