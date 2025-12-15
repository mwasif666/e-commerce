import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import AddProducts from "./AddProducts";
import UpdateProduct from "./UpdateProduct";
import Navigation from "./Navigation";
import LoginForm from "./LoginForm";
import SignupForm from "./Signup";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        {/* Home is accessible to logged-in users */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Admin-only routes */}
        <Route
          path="/addProduct"
          element={
            <ProtectedRoute adminOnly={true}>
              <AddProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/updateProduct/:id"
          element={
            <ProtectedRoute adminOnly={true}>
              <UpdateProduct />
            </ProtectedRoute>
          }
        />

        {/* Public routes */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </Router>
  );
};

export default App;
