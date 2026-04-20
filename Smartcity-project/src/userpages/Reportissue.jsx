import { useState, useContext, useRef } from "react";
import { UserName } from "../App.jsx";
import "./user.css";
import Cameracapture from "./Cameracapture.jsx";
import VoiceInput from "./VoiceInput.jsx";

const Reportissue = () => {
  const { currentUserName } = useContext(UserName);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");

  const fileInputRef = useRef(null);

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    const complaintData = {
      user_id: userId,
      title: title,           
      location: location,
      proof: image,
      status: "Pending"
    };

    console.log("Sending:", complaintData); 

    try {
      const response = await fetch("http://localhost:8011/complaint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(complaintData),
      });

      const data = await response.json();

      console.log("Response:", data);

      if (response.ok) {
        alert("Complaint Submitted Successfully");

        // clear form
        setTitle("");
        setLocation("");
        setImage("");

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

      } else {
        alert(data.response || "Error");
      }

    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <>

      <div className="report-head">
        <h2>Report Issue</h2>
      </div>
      <div className="report-wrapper">
        <div className="report-card">
          <form onSubmit={handleSubmit}>
            <h3 className="report-subtitle">Describe the Problem</h3>
            {/* 🎤 VOICE */}
            <div className="voice-row">
              <VoiceInput onTextDetected={(text) => setTitle(text)} />
            </div>

            {/* INPUTS */}
            <input
              type="text"
              placeholder="Issue (eg. Street light not working)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field"
              required
            />

            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input-field"
              required
            />

            {/* 📸 CAMERA SECTION */}
            <div className="camera-section">
              <p className="camera-text">
                Please upload proof of the issue using camera
              </p>

              <Cameracapture setImage={setImage} />

              {image && (
                <img src={image} alt="preview" className="preview-img" />
              )}
            </div>

            {/* SUBMIT */}
            <button type="submit" className="submit-btn">
              Submit Issue
            </button>

          </form>

        </div>
      </div>
    </>
  );
};

export default Reportissue;