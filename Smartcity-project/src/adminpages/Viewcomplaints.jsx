import React, { useEffect, useState } from "react";
import "./admin.css";

const Viewcomplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [managers, setManagers] = useState([]);

  // Fetch data on load
  useEffect(() => {
    fetchComplaints();
    fetchManagers();
  }, []);

  //  Fetch complaints
  const fetchComplaints = async () => {
    try {
      const res = await fetch("http://localhost:8011/complaint");
      const data = await res.json();
      setComplaints(data.response || []);
    } catch (err) {
      console.error("Error fetching complaints:", err);
    }
  };

  //  Fetch managers
  const fetchManagers = async () => {
    try {
      const res = await fetch("http://localhost:8011/manager");
      const data = await res.json();
      setManagers(data.response || []);
    } catch (err) {
      console.error("Error fetching managers:", err);
    }
  };

  // Assign manager (API CALL)
  const handleAssignManager = async (complaintId, managerId) => {
    try {
      const res = await fetch(`http://localhost:8011/assignmanager/${complaintId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          manager_id: managerId   // ✅ correct
        })
      });

      const data = await res.json();

      if (res.ok) {
        setComplaints(prev =>
          prev.map(c =>
            c._id === complaintId
              ? { ...c, manager_id: managerId, status: "InProgress" }
              : c
          )
        );

        alert("Manager assigned successfully");
      } else {
        alert(data.message);
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  // Time ago
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

  //  Status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "#ef4444";
      case "InProgress": return "#eab308";
      case "Resolved": return "#22c55e";
      default: return "#6b7280";
    }
  };

  return (
    <div className="complaints-container">
      <h2>Assign Complaints</h2>

      <div className="card-grid">
        {complaints.length === 0 ? (
          <p>No complaints found</p>
        ) : (
          complaints.map((c) => (
            <article className="complaint-cards" key={c._id}>
              <div className="image-container">

                {/* IMAGE FROM BACKEND */}
                <img
                  src={c.proof || "https://via.placeholder.com/300"}
                  alt={c.title}
                />

                {/* STATUS */}
                <span
                  className="status"
                  style={{ backgroundColor: getStatusColor(c.status) }}
                >
                  {c.status || "Pending"}
                </span>

                <div className="overlay-content">
                  <h3>{c.title}</h3>
                  <p>{c.location}</p>

                  {/* DATE */}
                  <p>{getTimeAgo(c.createdAt)}</p>
                  <p>{new Date(c.createdAt).toLocaleDateString()}</p>

                  {/* ASSIGN MANAGER */}
                  <select
                    className="assign-dropdown"
                    value={c.manager_id || ""}
                    onChange={(e) =>
                      handleAssignManager(c._id, e.target.value)
                    }
                  >
                    <option value="">Assign Manager</option>

                    {managers.map((m) => (
                      <option key={m._id} value={m._id}>
                        {m.name}
                      </option>
                    ))}
                  </select>

                  {/* SHOW ASSIGNED */}
                  {c.manager_id && (
                    <p className="assigned">
                      Assigned to: {c.manager_id}
                    </p>
                  )}

                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
};

export default Viewcomplaints;