import React, { useEffect, useState } from 'react'
import './user.css'

const Mycomplaints = () => {

  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchMyComplaints();
  }, []);

  const fetchMyComplaints = async () => {
    try {
      const res = await fetch("http://localhost:8011/complaint");
      const data = await res.json();

      const userId = localStorage.getItem("userId");

      // Filter only current user complaints
      const myData = data.response.filter(
        (c) => c.user_id === userId
      );

      setComplaints(myData);

    } catch (error) {
      console.error(error);
    }
  };

  // Status → Progress %
  const getProgress = (status) => {
    if (status === "Pending") return 0;
    if (status === "InProgress") return 50;
    if (status === "Solved") return 100;
  };

  return (
    <div className='report-container'>

      <div className="report-head">
        <h2>My Complaints</h2>
      </div>

      <div className="container">
        <div className="row g-3">

          {complaints.map((c) => (
            <div className="col-6 col-md-4" key={c._id}>

              <div className="complaint-wrapper">

                <div className="complaint-card d-flex align-items-center">

                  <img
                    src={c.proof}
                    alt="issue"
                    className="card-img"
                  />

                  <div className="compl-body">
                    <h4 className="title">{c.title}</h4>
                    <p className="location">{c.location}</p>
                    <p className='date'>
                      {new Date(c.createdAt).toLocaleDateString()}
                    </p>

                    <span className={`status ${c.status}`}>
                      {c.status}
                    </span>
                  </div>

                </div>

                {/*  Progress Bar */}
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
  )
}

export default Mycomplaints