import React, { useEffect, useState } from "react";
import DashboardCards from "../components/DashboardCards.jsx";

const Dashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [users, setUsers] = useState([]);
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [compRes, userRes, managerRes] = await Promise.all([
      fetch("http://localhost:8011/complaint"),
      fetch("http://localhost:8011/users"),
      fetch("http://localhost:8011/manager"),
    ]);

    const compData = await compRes.json();
    const userData = await userRes.json();
    const managerData = await managerRes.json();

    setComplaints(compData.response || []);
    setUsers(userData.response || []);
    setManagers(managerData.response || []);
    setLoading(false);
  };

  const cards = [
    { label: "Total Complaints", value: complaints.length, color: "blue" },
    { label: "Total Users", value: users.length, color: "purple" },
    { label: "Total Managers", value: managers.length, color: "orange" },
  ];

  return <DashboardCards cards={cards} loading={loading} title="Admin Dashboard" />;
};

export default Dashboard;