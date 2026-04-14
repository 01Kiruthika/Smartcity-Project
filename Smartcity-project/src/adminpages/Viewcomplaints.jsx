import React, { useState } from "react";
import "./admin.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const Viewcomplaints = () => {

  const managers = ["John", "David", "Priya", "Arun"];

  const sampleTimes = [
    Date.now() - 2 * 3600000,      // 2 hours ago
    Date.now() - 1 * 86400000,     // 1 day ago
    Date.now() - 3 * 86400000      // 3 days ago
  ];

  const [complaints, setComplaints] = useState(
    sampleTimes.map((time, i) => ({
      id: i + 1,
      title: "Road Damage",
      location: "Trichy",
      date: new Date(time),
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
      status: i % 2 === 0 ? "Pending" : "Resolved",
      assignedTo: ""
    }))
  );
  const handleAssignManager = (id, manager) => {
    const updated = complaints.map((c) =>
      c.id === id ? { ...c, assignedTo: manager } : c
    );
    setComplaints(updated);
  };

  // TIME AGO FUNCTION
  const getTimeAgo = (date) => {
    const now = new Date();
    const past = new Date(date);
    const diff = Math.floor((now - past) / 1000);

    if (diff < 60) return "Just now";
    if (diff < 3600) return Math.floor(diff / 60) + " min ago";
    if (diff < 86400) return Math.floor(diff / 3600) + " hrs ago";
    if (diff < 604800) return Math.floor(diff / 86400) + " days ago";

    return past.toLocaleDateString();
  };

  // STATUS CHANGE HANDLER
  const handleStatusChange = (id, newStatus) => {
    const updated = complaints.map((c) =>
      c.id === id ? { ...c, status: newStatus } : c
    );
    setComplaints(updated);
  };

  // STATUS COLOR
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#ef4444";
      case "Resolved":
        return "#22c55e";
      case "In Progress":
        return "#eab308";
      default:
        return "#6b7280";
    }
  };

  return (
    <div className="complaints-container">

      <h2>All Complaints</h2>

      <div className="card-grid">
        {complaints.map((c) => (
          <div className="complaint-cards" key={c.id}>

            <div className="image-container">
              <img src={c.image} alt="" />

              {/*  STATUS */}
              <span
                className="status"
                style={{ backgroundColor: getStatusColor(c.status) }}
              >
                {c.status}
              </span>

              {/*  ACTION BUTTONS */}
              <div className="card-actions">
                <button><FaEdit /></button>
                <button><FaTrash /></button>
              </div>

              {/*  OVERLAY CONTENT */}
              <div className="overlay-content">
                <h3>{c.title}</h3>
                <p>{c.location}</p>

                {/* TIME AGO */}
                <p>{getTimeAgo(c.date)}</p>

                {/* FULL DATE */}
                <p>
                  📅 {c.date ? new Date(c.date).toLocaleDateString() : "No date"}
                </p>

                {/* STATUS DROPDOWN */}
                <select
                  className="assign-dropdown"
                  value={c.assignedTo}
                  onChange={(e) =>
                    handleAssignManager(c.id, e.target.value)
                  }
                >
                  <option value="">Assign Manager</option>
                  {managers.map((m, i) => (
                    <option key={i} value={m}>{m}</option>
                  ))}
                </select>
                {c.assignedTo && (
                  <p className="assigned">
                    👤 Assigned to: {c.assignedTo}
                  </p>
                )}
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Viewcomplaints;