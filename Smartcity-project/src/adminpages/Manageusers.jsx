import React, { useEffect, useState } from "react";
import "./admin.css";

const ManageUsers = () => {
  const [selectedType, setSelectedType] = useState("all");
  const [users, setUsers] = useState([]);
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // 🔁 Combine for "All"
  const combinedData = [
    ...users.map(u => ({ ...u, type: "User" })),
    ...managers.map(m => ({ ...m, type: "Manager" }))
  ];

  return (
    <div className="table-container">

      <h2>Users & Managers</h2>

      {/* Dropdown */}
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
          {/*  ALL TABLE */}
          {selectedType === "all" && (
            combinedData.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {combinedData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.address}</td>
                      <td>{item.phonenumber}</td>
                      <td>{item.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-data">No records found</p>
            )
          )}

          {/* USERS */}
          {selectedType === "user" && (
            users.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, index) => (
                    <tr key={index}>
                      <td>{u.name}</td>
                      <td>{u.address}</td>
                      <td>{u.phonenumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-data">No users found</p>
            )
          )}

          {/*  MANAGERS */}
          {selectedType === "manager" && (
            managers.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Allocated Complaints</th>
                  </tr>
                </thead>
                <tbody>
                  {managers.map((m, index) => (
                    <tr key={index}>
                      <td>{m.name}</td>
                      <td>{m.address}</td>
                      <td>{m.phonenumber}</td>
                      <td>{m.complaints || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-data">No managers found</p>
            )
          )}
        </>
      )}
    </div>
  );
};

export default ManageUsers;