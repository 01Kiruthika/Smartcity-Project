import React, { useState } from "react";
import "./admin.css";

const CreateManager = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phonenumber: "",
    password: ""
  });

  // const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.phonenumber.length !== 10) {
      alert("❌ Phone number must be 10 digits");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:8011/manager", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        alert(" Manager created successfully");

        setFormData({
          name: "",
          address: "",
          phonenumber: "",
          password: ""
        });

      } else {
        alert(` ${data.message || "Failed to create manager"}`);
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="cm-container">

      <div className="cm-card">
        <h2 className="cm-title">Create Manager</h2>

        <form onSubmit={handleSubmit} className="cm-form">

          <div className="cm-field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter manager name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="cm-field">
            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="cm-field">
            <label>Phone Number</label>
            <input
              type="text"
              name="phonenumber"
              placeholder="Enter phone number"
              value={formData.phonenumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="cm-field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Manager"}
          </button>

        </form>

        {/* {message && <p className="cm-message">{message}</p>} */}
      </div>

    </div>
  );
};

export default CreateManager;