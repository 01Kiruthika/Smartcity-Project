import React from "react";
import "./admin.css";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const Viewcomplaints = () => {

  const complaints = Array.from({ length: 3 }, (_, i) => ({
    id: i + 1,
    title: "Road Damage",
    location: "Trichy",
    date: "2005-04-10",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
    status: i % 2 === 0 ? "Pending" : "Resolved"
  }));

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#ef4444";
      case "Resolved":
        return "#22c55e";
      default:
        return "#6b7280";
    }
  };

  return (
    <div className="complaints-container">

      <h2>All Complaints</h2>

      <div className="card-grid">
        {complaints.map((c) => (
          <div className="complaint-cards">

            <div className="image-container">
              <img src={c.image} alt="" />

              {/* STATUS */}
              <span
                className="status"
                style={{ backgroundColor: getStatusColor(c.status) }}
              ></span>
              <div className="card-actions">
                <button><FaEdit /></button>
                <button><FaTrash /></button>
              </div>
              {/* OVERLAY CONTENT */}
              <div className="overlay-content">
                <h3>{c.title}</h3>
                <p>{c.location}</p>
                <p>{c.date}</p>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Viewcomplaints;