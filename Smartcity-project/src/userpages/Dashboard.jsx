import React from 'react'
import { ResponsivePie } from "@nivo/pie";
import './user.css'

const Dashboard = () => {
  const chartData = [
    {id: "Total Complaints",value : 15},
    { id: "Pending", value: 5 },
    { id: "In Progress", value: 3 },
    { id: "Resolved", value: 7 }
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


      <div style={{ height: "300px" }}>
        <h3 style={{ textAlign: "center"}}>
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

  )
}

export default Dashboard
