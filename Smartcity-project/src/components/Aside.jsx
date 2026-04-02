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
                  <li><Link to="/admin"><i class="fa fa-tachometer" aria-hidden="true"></i>Dashboard</Link></li>
                  <li><Link to="/admin/users"><i className="fa fa-users" aria-hidden="true"></i>Manage Users</Link></li>
                  <li><Link to="/admin/assign"><i className="fa fa-tasks" aria-hidden="true"></i>Assign Work</Link></li>
                  <li><Link to="/admin/reports"><i className="fa fa-bar-chart" aria-hidden="true"></i>Reports</Link></li>
                  <li><Link to="/admin/logout"><i class="fa fa-sign-out" aria-hidden="true"></i>Logout</Link></li>
               </>
            )}

            {/* USER MENU */}
            {role === "citizen" && (
               <>
                  <li><Link to="/admin"><i class="fa fa-tachometer" aria-hidden="true"></i>Dashboard</Link></li>
                  <li><Link to="/admin/report"><i className="fa fa-pencil-square-o" aria-hidden="true"></i>Report Issue</Link></li>
                  <li><Link to="/admin/mycomplaints"><i class="fa fa-list" aria-hidden="true"></i>My Complaints</Link></li>
                  <li><Link to="/admin/trackstatus"><i class="fa fa-location-arrow" aria-hidden="true"></i>Track Status</Link></li>
                  {/* <li><Link to="/admin/profile"><i class="fa fa-user" aria-hidden="true"></i>Profile</Link></li> */}
                  <li><Link to="/admin/logout"><i class="fa fa-sign-out" aria-hidden="true"></i>Logout</Link></li>
               </>
            )}

            {/* MANAGER MENU */}
            {role === "manager" && (
               <>
                  <li><Link to="/admin"><i class="fa fa-tachometer" aria-hidden="true"></i>Dashboard</Link></li>
                  <li><Link to="/admin/assignedtask"><i class="fa fa-clipboard" aria-hidden="true"></i>Assigned Task</Link></li>
                  <li><Link to="/admin/updatestatus"><i class="fa fa-refresh" aria-hidden="true"></i>Update Status</Link></li>
                  <li><Link to="/admin/completedtask"><i class="fa fa-tachometer" aria-hidden="true"></i>Completed Task</Link></li>
                  <li><Link to="/admin/logout"><i class="fa fa-check-circle" aria-hidden="true"></i>Logout</Link></li>
               </>
            )}
         </ul>

      </aside>
   )
}

export default Aside
