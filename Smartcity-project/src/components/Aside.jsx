import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import { useContext } from "react";
import { UserName } from '../App.jsx';

const Aside = () => {
   const { role } = useContext(UserName);
   return (

      <aside>
         <ul>
            {/* ADMIN MENU */}
            {role === "admin" && (
               <>
                  <li><Link to="/admin">Dashboard</Link></li>
                  <li><Link to="/admin/users">Manage Users</Link></li>
                  <li><Link to="/admin/assign">Assign Work</Link></li>
                  <li><Link to="/admin/reports">Reports</Link></li>
                  <li><Link to="/admin/logout">Logout</Link></li>
               </>
            )}

            {/* USER MENU */}
            {role === "citizen" && (
               <>
                  <li><Link to="/admin">Home</Link></li>
                  <li><Link to="/admin/report">Report Issue</Link></li>
                  <li><Link to="/admin/mycomplaints">My Complaints</Link></li>
                  <li><Link to="/admin/trackstatus">Track Status</Link></li>
                  <li><Link to="/admin/profile">Profile</Link></li>
                  <li><Link to="/admin/logout">Logout</Link></li>
               </>
            )}
         </ul>

      </aside>
   )
}

export default Aside
