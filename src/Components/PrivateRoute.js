import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { userSignInContext } from "./Context/SignInContext";


const PrivateRoute = ({ children }) => {
  const { token } = useContext(userSignInContext);
  const location = useLocation();
  return token ? (
    children
  ) : (
    <Navigate replace state={{ from: location }} to="/Login" />
  );
};

export default PrivateRoute;
