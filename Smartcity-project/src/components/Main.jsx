import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../adminpages/Dashboard.jsx'
import Logout from '../adminpages/Logout.jsx'
import '../App.css'
import Manageusers from '../adminpages/Manageusers.jsx'
import Assignwork from '../adminpages/Assignwork.jsx'
import Reports from '../adminpages/Reports.jsx'
import Viewcomplaints from '../adminpages/Viewcomplaints.jsx'

const Main = () => {
    return (
        <main>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="manageusers" element={<Manageusers />} />
                <Route path="viewcomplaints" element={<Viewcomplaints />} />
                <Route path="assignwork" element={<Assignwork/>} />
                <Route path="reports" element={<Reports />} />
                <Route path="logout" element={<Logout />} />
            </Routes>
        </main>
    )
}

export default Main
