import React, { useState, useEffect } from "react";
import "../styles/dashboard.css";
import axios from "axios";

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [newApplication, setNewApplication] = useState({
    jobTitle: "",
    companyName: "",
    status: "saved",
    jobType: "full-time",
    location: "",
  });
  const [error, setError] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const fetchApplications = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/applications", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setApplications(response.data);
    } catch (err) {
      console.error("Error fetching applications:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/applications/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Application deleted successfully.");
      setApplications((prev) => prev.filter((app) => app.id !== id));
    } catch (err) {
      console.error("Error deleting application:", err.response?.data || err.message);
      alert("Failed to delete application.");
    }
  };

  const handleAdd = async () => {
    if (!newApplication.jobTitle || !newApplication.companyName) {
      setError("Job Title and Company Name are required.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/applications",
        newApplication,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setApplications((prev) => [...prev, response.data]);
      setNewApplication({
        jobTitle: "",
        companyName: "",
        status: "saved",
        jobType: "full-time",
        location: "",
      });
      setIsAdding(false);
      alert("Application added successfully.");
    } catch (err) {
      console.error("Error adding application:", err.response?.data || err.message);
      setError("Failed to add application.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewApplication({ ...newApplication, [name]: value });
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>JobTracker</h1>
        <div className="user-options">
          <button>Profile</button>
          <button>Logout</button>
        </div>
      </header>
      <div className="content">
        <h2>Your Applications</h2>
        <table className="applications-table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.jobTitle}</td>
                <td>{app.companyName}</td>
                <td>
                  <span className={`status-badge ${app.status.toLowerCase()}`}>
                    {app.status}
                  </span>
                </td>
                <td>
                  <button className="edit-button">Edit</button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(app.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="fab-button"
          onClick={() => setIsAdding((prev) => !prev)}
        >
          + Add Application
        </button>
        {isAdding && (
          <div className="add-application-form">
            <h3>Add New Application</h3>
            <form>
              <div>
                <label>Job Title:</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={newApplication.jobTitle}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Company Name:</label>
                <input
                  type="text"
                  name="companyName"
                  value={newApplication.companyName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Status:</label>
                <select
                  name="status"
                  value={newApplication.status}
                  onChange={handleInputChange}
                >
                  <option value="saved">Saved</option>
                  <option value="applied">Applied</option>
                  <option value="interviewing">Interviewing</option>
                  <option value="offered">Offered</option>
                  <option value="rejected">Rejected</option>
                  <option value="accepted">Accepted</option>
                </select>
              </div>
              <div>
                <label>Job Type:</label>
                <select
                  name="jobType"
                  value={newApplication.jobType}
                  onChange={handleInputChange}
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
              <div>
                <label>Location:</label>
                <input
                  type="text"
                  name="location"
                  value={newApplication.location}
                  onChange={handleInputChange}
                />
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <div className="form-actions">
                <button type="button" onClick={handleAdd}>
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAdding(false);
                    setNewApplication({
                      jobTitle: "",
                      companyName: "",
                      status: "saved",
                      jobType: "full-time",
                      location: "",
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
