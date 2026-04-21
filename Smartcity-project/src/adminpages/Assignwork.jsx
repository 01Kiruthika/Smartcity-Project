import React, { useEffect, useState } from "react";
import "./complaints.css";

const Assignwork = () => {
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:8011/complaint");
      const data = await res.json();

      setComplaints(data.response || []);
    } catch (err) {
      console.error("Error fetching complaints:", err);
    } finally {
      setLoading(false);
    }
  };

  //  Filter
  const filteredComplaints =
    filter === "all"
      ? complaints
      : complaints.filter((c) =>
          c.status?.toLowerCase() === filter.toLowerCase()
        );

  // Date Format
  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="complaints-container">

      <h2>All Complaints</h2>

      {/* Dropdown */}
      <select
        className="filter-dropdown"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Solved">Solved</option>
      </select>

      {loading ? (
        <p className="loading">Loading complaints...</p>
      ) : filteredComplaints.length === 0 ? (
        <p className="no-data">No complaints found</p>
      ) : (
        <div className="card-container">
          {filteredComplaints.map((comp, index) => (
            <div
              className="complaint-card"
              key={index}
              style={{
                backgroundImage: comp.proof
                  ? `url(${comp.proof})`
                  : "none",
              }}
            >

              {/* Overlay content */}
              <div className="card-overlay">

                <h3>{comp.title}</h3>

                <p><strong>Location:</strong> {comp.location}</p>

                <p><strong>Date:</strong> {formatDate(comp.createdAt)}</p>

                <span className={`status ${comp.status?.toLowerCase().replace(" ", "-")}`}>
                  {comp.status || "Pending"}
                </span>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Assignwork;