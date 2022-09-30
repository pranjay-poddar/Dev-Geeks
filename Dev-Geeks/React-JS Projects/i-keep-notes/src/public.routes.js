import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Login from "./screens/Login/login";

 const PublicRoute = ({
  component: RouteComponent,
  ...rest
}) => {
  
  const {activeUser} = useContext(AuthContext);
  return (
    activeUser ? <Redirect to='/homepage' /> :<RouteComponent/>
  );
};

export default PublicRoute