import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/landingpage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/login"); // Redirect to the Login Page
  };

  return (
    <div className="landing-page">
     <h1>Welcome to the Application buddy</h1>
      <button className="start-button" onClick={handleStart}>
        Let's Start
      </button>
    </div>
  );
};

export default LandingPage;
