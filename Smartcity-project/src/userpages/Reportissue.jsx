import { useState, useContext, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserName } from "../App.jsx";
import "./user.css";
import Cameracapture from "./Cameracapture.jsx";
import VoiceInput from "./VoiceInput.jsx";
import { UserContext } from "../UserContext.jsx";

const Reportissue = () => {
  const { currentUserName } = useContext(UserName);
  const { userId } = useContext(UserContext); // ✅ GLOBAL USER
  const locationData = useLocation();
  const navigate = useNavigate();

  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");

  const fileInputRef = useRef(null);

  // ✅ LOAD EDIT DATA
  useEffect(() => {
    if (locationData.state) {
      const c = locationData.state;

      setTitle(c.title || "");
      setLocation(c.location || "");
      setImage(c.proof || "");
      setEditId(c._id);
    } else {
      setTitle("");
      setLocation("");
      setImage("");
      setEditId(null);
    }
  }, [locationData.state, userId]); // ✅ FIXED

  // ✅ SUBMIT FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("User not logged in");
      return;
    }

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

        // RESET FORM
        setTitle("");
        setLocation("");
        setImage("");
        setEditId(null);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        navigate("/app/mycomplaints");
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

            {/* 🎤 Voice Input */}
            <div className="voice-row">
              <VoiceInput onTextDetected={(text) => setTitle(text)} />
            </div>

            {/* TITLE */}
            <input
              type="text"
              placeholder="Issue"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field"
              required
            />

            {/* LOCATION */}
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input-field"
              required
            />

            {/* CAMERA */}
            <div className="camera-section">
              <p className="camera-text">
                Upload proof of the issue
              </p>

              <Cameracapture setImage={setImage} />

              {/* PREVIEW */}
              {image && (
                <img
                  src={image}
                  alt="preview"
                  className="preview-img"
                  style={{
                    width: "150px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginTop: "10px"
                  }}
                />
              )}
            </div>

            {/* SUBMIT */}
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