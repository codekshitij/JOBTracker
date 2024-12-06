import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/loginpage.css"; // Ensure this file has styles for the page

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login URL:", "http://localhost:3000/api/auth/login");
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData
      );
      console.log("User logged in successfully:", response.data);
      localStorage.setItem("token", response.data.token);
      alert("Login successful!");
      navigate("/dashboard"); // Redirect to dashboard
    } catch (err) {
      console.error("Error logging in:", err.response.data);
      setError(err.response.data.message || "Invalid credentials");
    }
  };

  return (
    <div className="login-page">
      <h1>Login into Your Dashboard</h1> {/* Added heading */}
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <p>
        Not registered yet?{" "}
        <button
          className="link-button"
          onClick={() => navigate("/register")} // Redirects to Register Page
        >
          Register Here
        </button>
      </p>
    </div>
  );
};

export default LoginPage;
