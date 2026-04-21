import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  // SEND DATA VIA ROUTER STATE
  const handleEdit = (complaint) => {
    navigate("/app/report", { state: complaint });
  };

  const getProgress = (status) => {
    switch (status) {
      case "Pending": return 0;
      case "InProgress": return 50;
      case "Solved": return 100;
      default: return 0;
    }
  };

  return (
    <div className="report-container">
      <div className="report-head">
        <h2>My Complaints</h2>
      </div>

      <div className="container">
        <div className="row g-3">

          {complaints.map((c) => (
            <div className="col-6 col-md-4" key={c._id}>
              <div className="complaint-wrapper">

                <div className="complaint-card d-flex align-items-center">
                  <img src={c.proof} alt="issue" className="card-img" />

                  <div className="compl-body">
                    <h4 className="title">{c.title}</h4>
                    <p className="location">{c.location}</p>
                    <p className="date">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </p>

                    <span className={`status ${c.status}`}>
                      {c.status}
                    </span>


                    <div className="action-icons">
                      <button onClick={() => handleEdit(c)} className="icon-btn edit">
                        <FaEdit />
                      </button>

                      <button onClick={() => handleDelete(c._id)} className="icon-btn delete">
                        <FaTrash />
                      </button>
                    </div>


                  </div>


                </div>

                <div className="progress-container">
                  <div className="progress-track">
                    <div
                      className={`progress-fill ${c.status}`}
                      style={{ width: `${getProgress(c.status)}%` }}
                    ></div>
                  </div>

                  <span className="progress-text">
                    {getProgress(c.status)}%
                  </span>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Mycomplaints;