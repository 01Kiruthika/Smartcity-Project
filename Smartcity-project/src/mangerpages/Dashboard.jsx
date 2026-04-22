import React, { useEffect, useState } from "react";
import DashboardCards from "../components/DashboardCards.jsx";

const Dashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const managerId = localStorage.getItem("userId");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("http://localhost:8011/complaint");
    const data = await res.json();

    // ✅ FILTER ONLY THIS MANAGER
    const assigned = (data.response || []).filter(
      (c) => String(c.manager_id) === String(managerId)
    );

    setComplaints(assigned);
    setLoading(false);
  };

  // ✅ STATUS COUNTS
  const assignedCount = complaints.length;
  const inProgress = complaints.filter(c => c.status === "InProgress").length;
  const solved = complaints.filter(c => c.status === "Solved").length;

  const cards = [
    { label: "Assigned Complaints", value: assignedCount, color: "blue" },
    { label: "In Progress", value: inProgress,color: "purple"  },
    { label: "Solved", value: solved,color: "orange"  },
  ];

  return <DashboardCards cards={cards} loading={loading} title="Manager Dashboard" />;
};

export default Dashboard;