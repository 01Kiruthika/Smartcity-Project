import { useContext } from "react";
import { UserName } from "../App";

const Header = () => {
  const { currentUserName } = useContext(UserName);

  return (
    <header>
      <h2>Welcome, {currentUserName}</h2>
    </header>
  );
};

export default Header;