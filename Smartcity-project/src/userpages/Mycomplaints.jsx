import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ComplaintCard from "../components/ComplaintCard.jsx";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./user.css";

const Mycomplaints = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchMyComplaints();
  }, []);

  const fetchMyComplaints = async () => {
    try {
      const res = await fetch("http://localhost:8011/complaint");
      const data = await res.json();

      const userId = localStorage.getItem("userId");

      const myData = (data.response || []).filter(
        (c) => c.user_id === userId
      );

      setComplaints(myData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Do you want to delete this complaint?")) return;

    try {
      const res = await fetch(`http://localhost:8011/complaint/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Deleted Successfully");
        setComplaints((prev) => prev.filter((c) => c._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (complaint) => {
    navigate("/app/report", { state: complaint });
  };

  return (
    <div className="report-container">

      <div className="report-head">
        <h2>My Complaints</h2>
      </div>

      <div className="card-grid">

        {complaints.length === 0 ? (
          <p>No complaints found</p>
        ) : (
          complaints.map((c) => (
            <div key={c._id} className="card-wrapper">

              <ComplaintCard
                image={c.proof}
                title={c.title}
                status={c.status}
                location={c.location}
                date={c.createdAt}

                // PASS ACTIONS AS PROP
                actions={
                  <>
                    <button
                      onClick={() => handleEdit(c)}
                      className="edit-btn"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => handleDelete(c._id)}
                      className="delete-btn"
                    >
                      <FaTrash />
                    </button>
                  </>
                }
              />

            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default Mycomplaints;