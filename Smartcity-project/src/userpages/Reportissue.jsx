import { useState, useContext, useRef } from "react";
import { UserName } from "../App.jsx";
import "./user.css";
import Cameracapture from "./Cameracapture.jsx";

const Reportissue = () => {
  const { currentUserName } = useContext(UserName);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");

  const fileInputRef = useRef(null);


  // SUBMIT
  const handleSubmit = (e) => {
    debugger
    e.preventDefault();

    let today = new Date().toLocaleDateString();

    let newIssue = {
      id: Date.now(),
      user: currentUserName,
      title,
      location,
      date: today,
      image,
      status: "Pending"
    };

    console.log("Submitted Data:", newIssue);

    alert("Submitted Successfully!");


    setTitle("");
    setLocation("");
    setImage("");


    //CLEAR THE INPUT FILE
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="report-container">
      <div className="report-head">
        <h2>Report Issue</h2>
      </div>


      <div className="report-body">
        <form onSubmit={handleSubmit} className="reportissue-form">
          <h3>Fill the form</h3>

          <input
            type="text"
            placeholder="Issue..eg.Street light not working"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          {/* CAMERA */}
          <Cameracapture setImage={setImage} />

          {/* 🔥 IMAGE PREVIEW */}
          {image && (
            <div>
              <img src={image} alt="preview" width="150" />
            </div>
          )}



          <button type="submit">Submit</button>

        </form>
      </div>
    </div>
  );
};

export default Reportissue;