import React, { useEffect, useState } from "react";
import "./dashboard.css";

const Dashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [users, setUsers] = useState([]);
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [compRes, userRes, managerRes] = await Promise.all([
        fetch("http://localhost:8011/complaint"),
        fetch("http://localhost:8011/users"),
        fetch("http://localhost:8011/manager"),
      ]);

      const compData = await compRes.json();
      const userData = await userRes.json();
      const managerData = await managerRes.json();

      setComplaints(compData.response || []);
      setUsers(userData.response || []);
      setManagers(managerData.response || []);

    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // // Derived Stats
  // const pending = complaints.filter(c => c.status === "Pending").length;
  // const inProgress = complaints.filter(c => c.status === "In Progress").length;
  // const resolved = complaints.filter(
  //   c => c.status === "Resolved" || c.status === "Solved"
  // ).length;

  return (
    <div className="admin-dashboard">

      <h1>Admin Dashboard</h1>

      {loading ? (
        <p className="loading">Loading data...</p>
      ) : (
        <div className="dashboard-cards">

          <div className="dash-card blue">
            <h3>Total Complaints</h3>
            <p>{complaints.length}</p>
          </div>

          <div className="dash-card purple">
            <h3>Total Users</h3>
            <p>{users.length}</p>
          </div>

          <div className="dash-card orange">
            <h3>Total Managers</h3>
            <p>{managers.length}</p>
          </div>

          {/* <div className="dash-card red">
            <h3>Pending</h3>
            <p>{pending}</p>
          </div>

          <div className="dash-card yellow">
            <h3>In Progress</h3>
            <p>{inProgress}</p>
          </div>

          <div className="dash-card green">
            <h3>Resolved</h3>
            <p>{resolved}</p>
          </div> */}

        </div>
      )}
    </div>
  );
};

export default Dashboard;