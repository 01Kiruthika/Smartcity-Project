import React from 'react'
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";
import './user.css'

const Dashboard = () => {
  const chartData = [
    { id: "Total Complaints", value: 15 },
    { id: "Pending", value: 5 },
    { id: "In Progress", value: 3 },
    { id: "Resolved", value: 7 }
  ];
  const barData = [
    { status: "Total Complaints", value: 15 },
    { status: "Pending", value: 5 },
    { status: "In Progress", value: 3 },
    { status: "Resolved", value: 7 },
  ];
  return (
    <div className='dashboard-container ps-2'>
      <div className="row border border-secondary d-flex gap-2">
        <div className="totalcomplaints col-lg-2 col-md-4 col-sm-6 mx-3">
          <h4>Total Complaints</h4>
          <p>15</p>
        </div>
        <div className="totalcomplaints col-lg-2 col-md-4 col-sm-6">
          <h4>Resolved Issues</h4>
          <p>7</p>
        </div>
        <div className="totalcomplaints col-lg-2 col-md-4 col-sm-6">
          <h4>Pending Complaints</h4>
          <p>5</p>
        </div>
        <div className="totalcomplaints col-lg-2 col-md-4 col-sm-6">
          <h4> In Progress Issues</h4>
          <p>3</p>
        </div>

      </div>
      <div className="row mt-4">
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

        <div className="chart-box">
          <h3>Complaint Comparison</h3>

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
                    fontSize: "15px"
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

  )
}

export default Dashboard
