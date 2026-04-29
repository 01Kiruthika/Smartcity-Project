import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ComplaintCard from "../components/ComplaintCard.jsx";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./user.css";
import authFetch from "../Utils/authFetch.js"


const Mycomplaints = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyComplaints();
  }, []);

  const fetchMyComplaints = async () => {
    try {
      // const token = localStorage.getItem("token");

      const res = await authFetch("http://localhost:8011/complaint");
      const data = await res.json();

      setComplaints(data.response || []);


    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Do you want to delete this complaint?")) return;

    try {
      // const token = localStorage.getItem("token");

      const res = await authFetch(`http://localhost:8011/complaint/${id}`, {
        method: "DELETE",
      });

      
      if (res.ok) {
        alert("Deleted Successfully");

        //  REMOVE FROM UI
        setComplaints((prev) =>
          prev.filter((c) => c._id !== id)
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (complaint) => {
    navigate("/app/report", { state: complaint });
  };

  return (
    <div className="complaint-container">

      <div className="complaint-head">
        <h2>My Complaints</h2>
      </div>

      <div className="card-grids">

        {loading ? (
          <p>Loading...</p>
        ) : complaints.length === 0 ? (
          <p>No complaints found</p>
        ) : (
          // ✅ EXTRA SAFETY FILTER DURING RENDER
          complaints
            .filter(
              (c) =>
                String(c.user_id) ===
                String(localStorage.getItem("userId"))
            )
            .map((c) => (
              <div key={c._id} className="card-wrappers">

                <ComplaintCard
                  image={c.proof}
                  title={c.title}
                  status={c.status}
                  location={c.location}
                  date={c.createdAt}

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