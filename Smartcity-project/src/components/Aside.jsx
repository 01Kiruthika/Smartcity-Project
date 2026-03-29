import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
const Aside = () => {
   return (

      <aside>
         <ul>
            <li><Link to="/admin">Dashboard</Link></li>
            <li><Link to="/admin/logout">Logout</Link></li>
            {/* <li><Link to="/product">Product</Link></li>
            <li><Link to="/category">Category</Link></li>
            <li><Link to="/customer">Customer</Link></li> */}
            {/* <li><Link to="/logout">Logout</Link></li> */}
         </ul>

      </aside>
   )
}

export default Aside
