import React from 'react';
import { Navigate } from 'react-router-dom';
import { IS_LOGIN_USER } from '../../utils/constants';

const ProtectedRoute = ({ component: Component, ...props }) => {
  const loggedIn = localStorage.getItem(IS_LOGIN_USER) || props.loggedIn;

  return loggedIn ? <Component {...props} /> : <Navigate to='/' replace />;
};

export default ProtectedRoute;
