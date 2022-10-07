import './App.css';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/navbar.component";
import ExerciseList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";


function App() {
  return (
    <Router>
       <Navbar />
      <Routes>
        <Route path="/" element={<ExerciseList/>} />
    <Route path="/edit/:id" element={<EditExercise/>} />
    <Route path="/create" element={<CreateExercise/>} />
    <Route path="/user" element={<CreateUser/>} />
    </Routes>
   
    <br />
    
    </Router>
  );
}

export default App;
