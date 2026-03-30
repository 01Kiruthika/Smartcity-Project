import { useState, useContext } from "react";
import { UserName } from "../App";
import "./user.css";

const Reportissue = () => {
  const { currentUserName } = useContext(UserName);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");

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

    let newIssue = {
      id: Date.now(),
      user: currentUserName,
      title,
      location,
      date,
      image,
      status: "Pending"
    };

    console.log("Submitted Data:", newIssue);

    alert("Submitted Successfully!");


    setTitle("");
    setLocation("");
    setDate("");
    setImage("");
  };

  return (
    <div className="report-container">

      <h2>Report Issue</h2>

      <form onSubmit={handleSubmit} className="report-form">

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
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImage}
          required
        />


        {image && (
          <div className="preview">
            <img src={image} alt="preview" />
          </div>
        )}

        <button type="submit">Submit Issue</button>

      </form>
    </div>
  );
};

export default Reportissue;