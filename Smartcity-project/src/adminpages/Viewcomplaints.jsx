import React, { useState } from "react";
import "./admin.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const Viewcomplaints = () => {
  const managers = ["John", "David", "Priya", "Arun"];

  const sampleTimes = [
    Date.now() - 2 * 3600000,
    Date.now() - 1 * 86400000,
    Date.now() - 3 * 86400000,
    Date.now() - 5 * 3600000,
    Date.now() - 7 * 86400000,
    Date.now() - 30 * 60000,
  ];

  const titles = [
    "Road Damage", "Broken Streetlight", "Garbage Overflow",
    "Water Leakage",
  ];

  const locations = ["Trichy", "Chennai", "Madurai"];

  const images = [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
    "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=800",
    "https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800",
  ];

  const statuses = ["Pending", "Resolved", "In Progress"];

  const [complaints, setComplaints] = useState(
    sampleTimes.map((time, i) => ({
      id: i + 1,
      title: titles[i],
      location: locations[i],
      date: new Date(time),
      image: images[i],
      status: statuses[i % 3],
      assignedTo: "",
    }))
  );

  const handleAssignManager = (id, manager) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, assignedTo: manager } : c))
    );
  };

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

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "#ef4444";
      case "Resolved": return "#22c55e";
      case "In Progress": return "#eab308";
      default: return "#6b7280";
    }
  };

  return (
    <div className="complaints-container">
      <h2>All Complaints</h2>

      <div className="card-grid">
        {complaints.slice(0, 3).map((c) => (
          <article className="complaint-cards" key={c.id}>
            <div className="image-container">
              <img src={c.image} alt={c.title} loading="lazy" />

              <span className="status" style={{ backgroundColor: getStatusColor(c.status) }}>
                {c.status}
              </span>

              <div className="card-actions">
                <button aria-label="Edit"><FaEdit /></button>
                <button aria-label="Delete"><FaTrash /></button>
              </div>

              <div className="overlay-content">
                <h3>{c.title}</h3>
                <p>{c.location}</p>
                <p> {getTimeAgo(c.date)}</p>
                <p>{c.date.toLocaleDateString()}</p>

                <select
                  className="assign-dropdown"
                  value={c.assignedTo}
                  onChange={(e) => handleAssignManager(c.id, e.target.value)}
                >
                  <option value="">Assign Manager</option>
                  {managers.map((m, i) => (
                    <option key={i} value={m}>{m}</option>
                  ))}
                </select>

                {c.assignedTo && (
                  <p className="assigned">Assigned to: {c.assignedTo}</p>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Viewcomplaints;
