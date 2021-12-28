import React from "react";
import { Route } from "react-router-dom";
import Login from "./Login";

export const PrivateRoute = ({
  component: Component,
  setAuthedUser,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => (setAuthedUser ? <Component {...props} /> : <Login />)}
    />
  );
};
