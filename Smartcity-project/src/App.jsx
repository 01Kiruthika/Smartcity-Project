import { Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";

import Authupage from "./Authupage.jsx";

import Dashboardlayout from "./Dashboardlayout.jsx";
import Profile from "./userpages/Profile.jsx";

export const UserName = createContext();

function App() {
  const [currentUserName, setCurrentUserName] = useState("");
  const [role, setRole] = useState("");
  

  return (
    <UserName.Provider value={{ currentUserName, setCurrentUserName, role, setRole }}>

      <Routes>
        <Route path="/" element={<Authupage />} />
        <Route path="/admin/*" element={<Dashboardlayout />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

    </UserName.Provider>
  );
}

export default App;