import React, { useContext, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Main from './components/homepageComponent/Main';
import { AuthContext } from './context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';

const ProtectedRoute = ({ component: RouteComponent, ...rest }) => {
  const { activeUser, loggedIn } = useContext(AuthContext);

  return activeUser ? <RouteComponent /> : <Redirect to='/' />;
};

export default ProtectedRoute;
