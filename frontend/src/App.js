import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/loginpage";
import Dashboard from "./components/dashboard";
import RegisterPage from "./components/registerpage";
import LandingPage from "./components/landingpage";
import ProtectedRoute from "./components/protectedroute";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Route for Login Page */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Route for Registration Page */}
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Protected Route for Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
