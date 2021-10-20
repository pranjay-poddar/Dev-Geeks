import React from 'react';
import './App.css';
import Login from './screens/Login/login';
import Header from './components/header/header';
import { Route, Switch } from 'react-router-dom';
import HomePage from './screens/Homepage/homepage';
import Signup from './screens/Signup/signup';
import  AuthProvider from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import  ProtectedRoute  from './protected.routes';
import PublicRoute from './public.routes';
import ResetPassword from './screens/resetPassword'

export default function App() {
  return (
    <AuthProvider>
      <Header />
      <Switch>
        <PublicRoute exact path='/' component={Login} />
        <PublicRoute exact path='/signup' component={Signup} />
        <PublicRoute exact path='/resetPassword' component={ResetPassword} />
        {/* <Route exact path='/homepage' component={HomePage} /> */}
        <ProtectedRoute exact path='/homepage' component={HomePage} />
      </Switch>
      <ToastContainer autoClose={5000} />
    </AuthProvider>
  );
}
