import { useContext } from "react";
import { UserName } from "../App";
import '../App.css'

const Header = () => {
    const { adminName } = useContext(UserName);

    return (
        <div className="header">
            <h2>Welcome, {adminName}</h2>

        </div>
    );
};

export default Header;