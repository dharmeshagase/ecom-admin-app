import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

/**
 * @author
 * @function PrivateRoute
 **/

const PrivateRoute = () => {
  // const auth = useSelector(state=>state.authStore);
  const auth = JSON.parse(window.localStorage.getItem("user"));
  // console.log(auth);
  return auth ? <Outlet /> : <Navigate to="/signin" />;
};
export default PrivateRoute;
