import React, { useState, useEffect } from "react";
import "./admin.css";
import { useLocation, useNavigate } from "react-router-dom";

const CreateManager = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const editData = location.state?.manager;

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phonenumber: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  // ✅ Fill form when editing
  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name || "",
        address: editData.address || "",
        phonenumber: editData.phonenumber || "",
        email: editData.email || "",
        password: "" // keep empty
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.phonenumber.length !== 10) {
      alert("Phone number must be 10 digits");
      return;
    }

    try {
      setLoading(true);

      let res;

      // UPDATE
      if (editData) {
        res = await fetch(`http://localhost:8011/manager/${editData._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });
      }
      else {
        res = await fetch("http://localhost:8011/manager", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
      }

      const data = await res.json();

      if (res.ok) {
        alert(editData ? "Manager updated successfully" : "Manager created successfully");

        navigate("/app/users"); // redirect back
      } else {
        alert(data.message || "Error");
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
        <h2 className="cm-title">
          {editData ? "Edit Manager" : "Create Manager"}
        </h2>

        <form onSubmit={handleSubmit} className="cm-form">

          <div className="cm-field">
            <label>Name</label>
            <input
              type="text"
              name="name"
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
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="cm-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="cm-field">
            <label>Phone Number</label>
            <input
              type="text"
              name="phonenumber"
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
              placeholder={editData ? "Leave blank to keep same password" : ""}
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading
              ? "Processing..."
              : editData
                ? "Update Manager"
                : "Create Manager"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateManager;