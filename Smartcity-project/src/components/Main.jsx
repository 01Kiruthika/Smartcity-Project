import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { UserName } from "../App";

// ADMIN PAGES
import Dashboard from "../adminpages/Dashboard.jsx";
import Logout from "../adminpages/Logout.jsx";
import Manageusers from "../adminpages/Manageusers.jsx";
import Assignwork from "../adminpages/Assignwork.jsx";
import Reports from "../adminpages/Reports.jsx";
import Viewcomplaints from "../adminpages/Viewcomplaints.jsx";

// USER PAGES
import Home from "../userpages/Home.jsx";
import Reportissue from "../userpages/Reportissue.jsx";
import Mycomplaints from "../userpages/Mycomplaints.jsx";
import Trackstatus from "../userpages/Trackstatus.jsx";
import Profile from "../userpages/Profile.jsx";

const Main = () => {
  const { role } = useContext(UserName);

  return (
    <main>
      <Routes>

        {/* ADMIN ROUTES */}
        {role === "admin" && (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="manageusers" element={<Manageusers />} />
            <Route path="viewcomplaints" element={<Viewcomplaints />} />
            <Route path="assignwork" element={<Assignwork />} />
            <Route path="reports" element={<Reports />} />
            <Route path="logout" element={<Logout />} />
          </>
        )}

        {/* USER ROUTES */}
        {role === "citizen" && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="report" element={<Reportissue />} />
            <Route path="mycomplaints" element={<Mycomplaints />} />
            <Route path="trackstatus" element={<Trackstatus />} />
            <Route path="profile" element={<Profile />} />
            <Route path="logout" element={<Logout />} />
          </>
        )}

      </Routes>
    </main>
  );
};

export default Main;