import { useState, useContext, useRef } from "react";
import { UserName } from "../App";
import "./user.css";

const Reportissue = () => {
  const { currentUserName } = useContext(UserName);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");


  const fileInputRef = useRef(null);

  let handleImage = (e) => {
    debugger;
    let file = e.target.files[0];

    if (file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // SUBMIT
  const handleSubmit = (e) => {
    debugger
    e.preventDefault();

    let today = new Date().toLocaleDateString();

    let newIssue = {
      id: Date.now(),
      user: currentUserName,
      category,
      title,
      location,
      date: today,
      image,
      status: "Pending"
    };

    console.log("Submitted Data:", newIssue);

    alert("Submitted Successfully!");

    setCategory("");
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
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Road">Road</option>
            <option value="Electricity">Electricity</option>
            <option value="Water">Water</option>
            <option value="Garbage">Garbage</option>
            <option value="Other">Other</option>
          </select>
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

          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImage}
            ref={fileInputRef}
            required

          />


          {image && (
            <div className="preview">
              <img src={image} alt="preview" />
            </div>
          )}

          <button type="submit">Submit</button>

        </form>
      </div>
    </div>
  );
};

export default Reportissue;