import React, { useState } from "react";
import "./admin.css";

const ManageUsers = () => {

  const [selectedType, setSelectedType] = useState("");

  // Users Data
  const users = [
    { id: 1, name: "Kumar", address: "Trichy", phone: "9876543210" },
    { id: 2, name: "Divya", address: "Chennai", phone: "9876543211" }
  ];

  // Managers Data
  const managers = [
    { id: 1, name: "John", address: "Madurai", phone: "9876543220", complaints: 5 },
    { id: 2, name: "Priya", address: "Coimbatore", phone: "9876543221", complaints: 3 }
  ];

  return (
    <div className="table-container">

      <h2> Users & Managers</h2>

      {/* Dropdown */}
      <select
        className="dropdown"
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="">Select Option</option>
        <option value="user">User</option>
        <option value="manager">Manager</option>
      </select>

      {/* Users Table */}
      {selectedType === "user" && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.address}</td>
                <td>{u.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Managers Table */}
      {selectedType === "manager" && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Allocated Complaints</th>
            </tr>
          </thead>

          <tbody>
            {managers.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.name}</td>
                <td>{m.address}</td>
                <td>{m.phone}</td>
                <td>{m.complaints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
};

export default ManageUsers;