// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    // If not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !user.isAdmin) {
    // If route is admin only and user is not admin
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
