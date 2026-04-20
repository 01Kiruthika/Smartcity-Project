import React, { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";
import "./user.css";

const Dashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Complaints from Backend
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await fetch("http://localhost:8011/complaint");
        const data = await res.json();

        setComplaints(data.response || []);
      } catch (error) {
        console.log("Error fetching complaints:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  // Calculate Stats
  const total = complaints.length;

  const pending = complaints.filter(
    (c) => c.status === "Pending"
  ).length;

  const inProgress = complaints.filter(
    (c) => c.status === "In Progress"
  ).length;

  const resolved = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  // Pie Chart Data
  const chartData = [
    { id: "Total Complaints", value: total },
    { id: "Pending", value: pending },
    { id: "In Progress", value: inProgress },
    { id: "Resolved", value: resolved },
  ];

  //Bar Chart Data
  const barData = [
    { status: "Total Complaints", value: total },
    { status: "Pending", value: pending },
    { status: "In Progress", value: inProgress },
    { status: "Resolved", value: resolved },
  ];

  return (
    <div className="dashboard-container ps-2">

      {/* Summary Cards */}
      <div className="row border border-secondary d-flex gap-2">

        <div className="totalcomplaints col-lg-2 col-md-4 col-sm-6 mx-3">
          <h4>Total Complaints</h4>
          <p>{total}</p>
        </div>

        <div className="totalcomplaints col-lg-2 col-md-4 col-sm-6">
          <h4>Resolved Issues</h4>
          <p>{resolved}</p>
        </div>

        <div className="totalcomplaints col-lg-2 col-md-4 col-sm-6">
          <h4>Pending Complaints</h4>
          <p>{pending}</p>
        </div>

        <div className="totalcomplaints col-lg-2 col-md-4 col-sm-6">
          <h4>In Progress Issues</h4>
          <p>{inProgress}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="row mt-4">

        {/* Pie Chart */}
        <div className="col-md-6">
          <div style={{ height: "300px" }}>
            <h3 style={{ textAlign: "center" }}>
              Complaint Status Overview
            </h3>

            <ResponsivePie
              data={chartData}
              margin={{ top: 10, right: 80, bottom: 80, left: 80 }}
              innerRadius={0.4}
              padAngle={2}
              cornerRadius={5}
              activeOuterRadiusOffset={10}
              colors={{ scheme: "set1" }}
              borderWidth={2}
              borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsTextColor="#333"
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: "color" }}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor="#fff"
              legends={[
                {
                  anchor: "bottom",
                  direction: "row",
                  translateY: 50,
                  itemWidth: 115,
                  itemHeight: 18,
                  symbolSize: 12,
                },
              ]}
            />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="col-md-6">
          <h3 style={{ textAlign: "center" }}>
            Complaint Comparison
          </h3>

          <div style={{ height: "300px" }}>
            <ResponsiveBar
              data={barData}
              keys={["value"]}
              indexBy="status"
              margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
              padding={0.3}

              colors={({ data }) => {
                if (data.status === "Total Complaints") return "#4CAF50";
                if (data.status === "Pending") return "#FF9800";
                if (data.status === "In Progress") return "#2196F3";
                if (data.status === "Resolved") return "#9C27B0";
                return "#ccc";
              }}

              axisBottom={{
                tickRotation: -20,
              }}

              enableLabel={false}

              tooltip={({ value, indexValue }) => (
                <div
                  style={{
                    padding: "5px 20px",
                    width: "150px",
                    background: "#222",
                    color: "#fff",
                    borderRadius: "5px",
                    fontSize: "15px",
                  }}
                >
                  {indexValue}: {value}
                </div>
              )}

              animate={true}
              motionStiffness={90}
              motionDamping={15}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;