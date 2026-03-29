import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../Pages/Dashboard.jsx'
import Logout from '../Pages/Logout.jsx'
import '../App.css'

const Main = () => {
    return (
        <main>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="logout" element={<Logout />} />
            </Routes>
        </main>
    )
}

export default Main
