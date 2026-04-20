import { useState, useContext, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { UserName } from "../App.jsx";
import "./user.css";
import Cameracapture from "./Cameracapture.jsx";
import VoiceInput from "./VoiceInput.jsx";

const Reportissue = () => {
  const { currentUserName } = useContext(UserName);
  const locationData = useLocation();

  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");

  const fileInputRef = useRef(null);

  // LOAD EDIT DATA FROM ROUTER
  useEffect(() => {
    if (locationData.state) {
      const c = locationData.state;

      setTitle(c.title || "");
      setLocation(c.location || "");
      setImage(c.proof || "");
      setEditId(c._id);
    } else {
      // normal open → empty
      setTitle("");
      setLocation("");
      setImage("");
      setEditId(null);
    }
  }, [locationData.state]);

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    const complaintData = {
      user_id: userId,
      title,
      location,
      proof: image,
      status: "Pending",
    };

    try {
      let url = "http://localhost:8011/complaint";
      let method = "POST";

      if (editId) {
        url = `http://localhost:8011/complaint/${editId}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(complaintData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(editId ? "Updated Successfully" : "Complaint Submitted Successfully");

        setTitle("");
        setLocation("");
        setImage("");
        setEditId(null);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

      } else {
        alert(data.message || "Error");
      }

    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <>
      <div className="report-head">
        <h2>{editId ? "Edit Issue" : "Report Issue"}</h2>
      </div>

      <div className="report-wrapper">
        <div className="report-card">

          <form onSubmit={handleSubmit}>
            <h3 className="report-subtitle">Describe the Problem</h3>

            <div className="voice-row">
              <VoiceInput onTextDetected={(text) => setTitle(text)} />
            </div>

            <input
              type="text"
              placeholder="Issue"
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

            <div className="camera-section">
              <p className="camera-text">
                Upload proof of the issue
              </p>

              <Cameracapture setImage={setImage} />

              {image && (
                <img src={image} alt="preview" className="preview-img" />
              )}
            </div>

            <button type="submit" className="submit-btn">
              {editId ? "Update Issue" : "Submit Issue"}
            </button>

          </form>

        </div>
      </div>
    </>
  );
};

export default Reportissue;