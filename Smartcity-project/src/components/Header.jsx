import React, { useContext } from "react";
import {UserName } from "../App.jsx";

const Header = () => {
    const { name } = useContext(UserName);

    return (
        <div className="header">
            <h2>Welcome, {name}</h2>
        </div>
    );
};

export default Header;