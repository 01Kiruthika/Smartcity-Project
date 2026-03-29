import { Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";

import Authupage from "./Authupage.jsx";

import Dashboardlayout from "./Dashboardlayout.jsx";

export const UserName = createContext();

function App() {
  const [adminName, setAdminName] = useState("");
  const [role, setRole] = useState("");

  return (
    <UserName.Provider value={{ adminName, setAdminName, role, setRole }}>

      <Routes>
        <Route path="/" element={<Authupage />} />
        <Route path="/admin/*" element={<Dashboardlayout />} />
      </Routes>
    </UserName.Provider>
  );
}

export default App;