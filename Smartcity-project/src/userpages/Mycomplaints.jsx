import React from 'react'
import './user.css'

const Mycomplaints = () => {
  return (
    <div className='report-container'>

      <div className="report-head">
        <h2>My Complaints</h2>
      </div>

      <div className="container border border-warning">
        <div className="row g-2 border border-primary">

          <div className="col-6 col-md-4">
            <div className="complaint-wrapper">
              <div className="complaint-card d-flex align-items-center">

                <img
                  src="https://img.freepik.com/free-photo/lavender-field-sunset-near-valensole_268835-3910.jpg"
                  alt="issue"
                  className="card-img"
                />

                <div className="compl-body">
                  <h4 className="title">Street light not working</h4>
                  <p className="location">Trichy</p>
                  <p className='date'>01/04/2025</p>
                  <span className="status pending">Pending</span>
                </div>




              </div>
              <div className="progress-container">
                <div className="progress-track">
                  <div className="progress-fill pending"></div>
                </div>
                <span className="progress-text">0%</span>
              </div>

            </div>
          </div>



          <div className="col-6 col-md-4">
            <div className="complaint-wrapper">
              <div className="complaint-card d-flex align-items-center">

                <img
                  src="https://img.freepik.com/free-photo/lavender-field-sunset-near-valensole_268835-3910.jpg"
                  alt="issue"
                  className="card-img"
                />

                <div className="compl-body">
                  <h4 className="title">Street light not working</h4>
                  <p className="location">Trichy</p>
                  <p className='date'>01/04/2025</p>
                  <span className="status in-progress ">progress</span>
                </div>




              </div>
              <div className="progress-container">
                <div className="progress-track">
                  <div className="progress-fill progress"></div>
                </div>
                <span className="progress-text">50%</span>
              </div>


            </div>
          </div>


          <div className="col-6 col-md-4">
            <div className="complaint-wrapper">
              <div className="complaint-card d-flex align-items-center">

                <img
                  src="https://img.freepik.com/free-photo/lavender-field-sunset-near-valensole_268835-3910.jpg"
                  alt="issue"
                  className="card-img"
                />

                <div className="compl-body">
                  <h4 className="title">Street light not working</h4>
                  <p className="location">Trichy</p>
                  <p className='date'>01/04/2025</p>
                  <span className="status resolved">solved</span>
                </div>




              </div>
              <div className="progress-container">
                <div className="progress-track">
                  <div className="progress-fill solved"></div>
                </div>
                <span className="progress-text">100%</span>
              </div>


            </div>
          </div>

        </div>
      </div >

    </div >
  )
}

export default Mycomplaints