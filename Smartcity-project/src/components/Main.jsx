import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../Pages/Dashboard.jsx'
import Logout from '../Pages/Logout.jsx'

const Main = () => {
    return (
        <main>
            <Routes>
                <Route path='/' element={<Dashboard />}></Route>
                <Route path='/dashboard' element={<Dashboard />}></Route>
                <Route path='/logout' element={<Logout />}></Route>
                {/* <Route path='/category' element={<Category />}></Route>
                <Route path='/customer' element={<Customer />}></Route> */}
            </Routes>
        </main>
    )
}

export default Main
