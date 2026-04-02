import { useContext } from "react";
import { UserName } from "../App";
import { useNavigate } from "react-router-dom";
import logo from '../Images/user.png'
import '../App.css'

const Header = () => {
  const { currentUserName } = useContext(UserName);
    const navigate = useNavigate();


  return (
    <header>
      <h2>Welcome, {currentUserName}</h2>

      <div className="logo">
        <img src={logo} alt="user"  />
      </div>
    </header>
  );
};

export default Header;