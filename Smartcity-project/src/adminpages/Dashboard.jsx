import React from "react";
import "./dashboard.css";

const Dashboard = ({ complaints = [], users = [], managers = [] }) => {

  return (
    <div className="admin-dashboard">

      <h1>Admin Dashboard</h1>

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

      </div>

    </div>
  );
};

export default Dashboard;