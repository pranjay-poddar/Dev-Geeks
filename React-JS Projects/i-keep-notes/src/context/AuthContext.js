import React, { useContext, useState, createContext, useEffect } from 'react';

import { getAuth } from 'firebase/auth';
import authApp from '../firebase';
import Login from '../screens/Login/login';

export const AuthContext = React.createContext('');
const AuthProvider = ({ children }) => {
  const [activeUser, setCurrentUser] = useState('');
  const auth = getAuth(authApp);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);
  const value = {
    activeUser,
  };
  return (
    <AuthContext.Provider value={{ activeUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
