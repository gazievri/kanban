import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isLogged }) => {
  return isLogged ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;