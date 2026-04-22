import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./admin.css";
import ComplaintCard from "../components/ComplaintCard.jsx";

const Viewcomplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🕒 Time ago
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

  // 📦 Fetch data
  const fetchData = async () => {
    try {
      const [complaintRes, managerRes] = await Promise.all([
        fetch("http://localhost:8011/complaint"),
        fetch("http://localhost:8011/manager"),
      ]);

      const complaintData = await complaintRes.json();
      const managerData = await managerRes.json();

      setComplaints(complaintData.response || []);
      setManagers(managerData.response || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Assign Manager
  const handleAssign = async (complaintId, managerId) => {
    try {
      const selectedManager = managers.find(m => m._id === managerId);

      const res = await fetch(
        `http://localhost:8011/complaint/${complaintId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            manager_id: managerId,
            manager_name: selectedManager?.name,
            status: "InProgress",
          }),
        }
      );

      if (res.ok) {
        alert("Manager assigned successfully");
        fetchData(); // refresh
      } else {
        alert("Failed to assign");
      }

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="complaints-container">
      <h2>Assign Complaints</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="card-grid">

          {complaints.map((c) => (
            <div key={c._id} className="card-wrapper">

              {/* ✅ ORIGINAL CARD (UNCHANGED) */}
              <ComplaintCard
                image={c.proof}
                title={c.title}
                status={c.status}
                location={c.location}
                date={c.createdAt} // keep original
                actions={
                  <>
                    {/* 🕒 TIME AGO */}
                    <p className="timeago">
                      {getTimeAgo(c.createdAt)}
                    </p>
                    {/* 🎯 ASSIGN DROPDOWN */}
                    {c.status === "Pending" && (
                      <select
                        className="assign-dropdown"
                        onChange={(e) =>
                          handleAssign(c._id, e.target.value)
                        }
                      >
                        <option value="">Assign Manager</option>
                        {managers.map((m) => (
                          <option key={m._id} value={m._id}>
                            {m.name}
                          </option>
                        ))}
                      </select>
                    )}
                    {/* 👤 ASSIGNED MANAGER */}
                    {c.manager_name && (
                      <p className="assigned">
                        Assigned to: <strong>{c.manager_name}</strong>
                      </p>
                    )}


                  </>
                }
              />






            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Viewcomplaints;