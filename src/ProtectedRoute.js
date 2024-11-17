import React from 'react';
import { Navigate } from 'react-router-dom';

// ProtectedRoute checks if the user is logged in using JWT token
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('auth_token'); // Get the JWT token

  if (!token) {
    // If no token is found, redirect to the login page
    return <Navigate to="/" />;
  }

  return children; // Render the children (protected components)
};

export default ProtectedRoute;
