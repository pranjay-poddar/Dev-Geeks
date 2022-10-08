import React, {useEffect, createContext, useReducer, useContext, useState} from 'react';
import './App.css';
import NavBar from './components/NavBar';
import About from './screens/About';
import Contact from './screens/Contact';
import Home from './screens/Home';
import Footer from './components/Footer';

import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import AllPosts from './screens/AllPosts';
import PostDetails from './screens/PostDetails';
import CreatePost from './screens/CreatePost';
import Signup from './screens/Signup';
import Login from './screens/Login';
import { initialUserState,  userReducer } from './reducers/userReducer';


export const UserContext = createContext();



function DynamicRoutes() {


  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      // user is already logged in
      const user = localStorage.getItem('user');
      const userState = {'token': token, 'user': user};
      dispatch({type: 'LOGIN', payload: userState});
      
      navigate('/posts');
    }
    else {
      navigate('/login');
    }
    
  }, []);
  

return(
  <Routes>
        <Route exact path="/about" element={<About />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/posts" element={<AllPosts />} />
        <Route exact path="/create" element={< CreatePost />} />
        <Route exact path="/create/:postId/:userId" element={< CreatePost />} />
        <Route exact path="/posts/:postId/:userId" element={<PostDetails/>} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/" element={<Home />} />
      
      </Routes>
)
}


function App() {
  const [state, dispatch] = useReducer(userReducer, initialUserState);



  return (

    <UserContext.Provider value={{ state: state, dispatch: dispatch }}>
    <Router>
    <div>
      
      <NavBar ></NavBar>
      <DynamicRoutes></DynamicRoutes>
      <Footer />
    </div>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
