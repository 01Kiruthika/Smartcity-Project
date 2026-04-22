import React, { useEffect, useState } from "react";
import "./admin.css";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const Manageusers = () => {
  const [selectedType, setSelectedType] = useState("all");
  const [users, setUsers] = useState([]);
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [userRes, managerRes] = await Promise.all([
        fetch("http://localhost:8011/users"),
        fetch("http://localhost:8011/manager"),
      ]);

      const userData = await userRes.json();
      const managerData = await managerRes.json();

      setUsers(userData.response || []);
      setManagers(managerData.response || []);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE MANAGER
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this manager?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:8011/manager/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || "Manager deleted successfully");
        fetchData(); // refresh
      } else {
        alert(data.message || "Delete failed");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };
  // ✅ EDIT MANAGER
  const handleEdit = (manager) => {
    navigate("/app/CreateManager", { state: { manager } });
  };

  // 🔁 Combine
  const combinedData = [
    ...users.map((u) => ({ ...u, type: "User" })),
    ...managers.map((m) => ({ ...m, type: "Manager" })),
  ];

  return (
    <div className="table-container">

      <h2>Users & Managers</h2>

      <select
        className="dropdown"
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="all">All</option>
        <option value="user">Users</option>
        <option value="manager">Managers</option>
      </select>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <>
          {/* ALL */}
          {selectedType === "all" && (
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {combinedData.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.address}</td>
                    <td>{item.phonenumber}</td>
                    <td>{item.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* USERS */}
          {selectedType === "user" && (
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{u.name}</td>
                    <td>{u.address}</td>
                    <td>{u.phonenumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* MANAGERS */}
          {selectedType === "manager" && (
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {managers.map((m, index) => (
                  <tr key={m._id}>
                    <td>{index + 1}</td>
                    <td>{m.name}</td>
                    <td>{m.address}</td>
                    <td>{m.phonenumber}</td>
                    <td>{m.email}</td>
                    <td>
                      <button onClick={() => handleEdit(m)}>  <FaEdit /> </button>
                      <button onClick={() => handleDelete(m._id)}>  <FaTrash /> </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default Manageusers;