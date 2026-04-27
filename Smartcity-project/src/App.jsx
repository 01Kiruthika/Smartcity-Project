import { Routes, Route } from "react-router-dom";
import { createContext, useState, useEffect } from "react";

import Authupage from "./Authupage.jsx";
import Dashboardlayout from "./Dashboardlayout.jsx";
import Profile from "./userpages/Profile.jsx";

export const UserName = createContext();

function App() {
  const [currentUserName, setCurrentUserName] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ LOAD FROM LOCALSTORAGE ON REFRESH
  useEffect(() => {
    const savedName = localStorage.getItem("name");
    const savedRole = localStorage.getItem("role");

    if (savedName) setCurrentUserName(savedName);
    if (savedRole) setRole(savedRole);

    setLoading(false);
  }, []);

  // ⛔ WAIT UNTIL DATA LOADED
  if (loading) return <h2>Loading App...</h2>;

  return (
    <UserName.Provider value={{ currentUserName, setCurrentUserName, role, setRole }}>

      <Routes>
        <Route path="/" element={<Authupage />} />
        <Route path="/app/*" element={<Dashboardlayout />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

    </UserName.Provider>
  );
}

export default App;