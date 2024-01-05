import React from "react";
import { useSelector } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import LoadingScreen from "../Components/LoadingScreen";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  console.log(localStorage.getItem("token"))
  const token = localStorage.getItem("token");

  if (!token ) {
    return <LoadingScreen />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default ProtectedRoute;

