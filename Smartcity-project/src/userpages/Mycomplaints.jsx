import React from 'react'
import './user.css'

const Mycomplaints = () => {
  return (
    <div className='report-container'>

      <div className="report-head">
        <h2>My Complaints</h2>
      </div>

      <div className="Complaint-body">

        {[1,2,3,4,5,6,7,8,9,10,11,12].map((item) => (
          <div className="complaint-card" key={item}>

            <img
              src="https://img.freepik.com/free-photo/lavender-field-sunset-near-valensole_268835-3910.jpg?semt=ais_incoming&w=740&q=80"
              alt="issue"
              className="card-img"
            />

            <div className="compl-body">
              <h4 className="title">Street light not working</h4>
              <p className="location">Trichy</p>
              <span className="status pending">Pending</span>
            </div>

          </div>
        ))}

      </div>

    </div>
  )
}

export default Mycomplaints