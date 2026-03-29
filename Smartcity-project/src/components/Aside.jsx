import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
const Aside = () => {
   return (

      <aside>
         <ul>
            <li><Link to="/admin">Dashboard</Link></li>
            <li><Link to="/admin/manageusers">Manage users</Link></li>
            <li><Link to="/admin/viewcomplaints">View Complaints</Link></li>
            <li><Link to="/admin/assignwork">Assign Work</Link></li>
            <li><Link to="/admin/reports">Reports</Link></li>
            <li><Link to="/admin/logout">Logout</Link></li>
         </ul>

      </aside>
   )
}

export default Aside
