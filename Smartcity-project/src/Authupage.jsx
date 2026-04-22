import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { UserName } from "./App.jsx";

const Authupage = () => {
  const [active, setActive] = useState(false);

  const { setCurrentUserName, setRole } = useContext(UserName);
  const navigate = useNavigate();

  // LOGIN STATES
  const [loginPhone, setLoginPhone] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginRole, setLoginRole] = useState("");

  // REGISTER STATES
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setaddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ================= REGISTER =================
  const handleRegister = async (e) => {
    e.preventDefault();

    if (phone.length !== 10) {
      alert("Enter valid 10 digit phone number!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password not match");
      return;
    }

    const userData = {
      name,
      phonenumber: phone,
      address,
      password,
    };

    try {
      const response = await fetch("http://localhost:8011/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.status === true) {
        alert(data.message);

        setActive(false);

        setName("");
        setPhone("");
        setaddress("");
        setPassword("");
        setConfirmPassword("");
      } else {
        alert(data.response);
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  // ================= LOGIN =================
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginRole) {
      alert("Please select a role!");
      return;
    }

    const loginData = {
      phonenumber: loginPhone,
      password: loginPassword,
      role: loginRole.toLowerCase(),
    };

    try {
      const response = await fetch("http://localhost:8011/userlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (data.status === true) {
        alert("Login Success");

        // ✅ CLEAR OLD DATA (VERY IMPORTANT)
        localStorage.clear();

        // ✅ STORE NEW USER DATA
        localStorage.setItem("userId", data.response._id);
        localStorage.setItem("name", data.response.name);
        localStorage.setItem("role", data.response.role);

        // ✅ UPDATE CONTEXT
        setCurrentUserName(data.response.name);
        setRole(data.response.role);

        console.log("Logged in userId:", data.response._id);

       navigate("/app");

      } else {
        alert(data.message || "Invalid Credentials");
      }

    } catch (error) {
      console.error(error);
      alert("Server Error");
    }

    // Clear fields
    setLoginPhone("");
    setLoginPassword("");
    setLoginRole("");
  };

  return (
    <div className="main-container">

      <div className={`container ${active ? "active" : ""}`}>

        {/* LOGIN */}
        <div className="form-container sign-in">
          <form onSubmit={handleLogin}>
            <h1>Login</h1>

            <div className="input-group">
              <input
                type="number"
                value={loginPhone}
                onChange={(e) => setLoginPhone(e.target.value)}
                required
              />
              <label>Phone Number</label>
            </div>

            <div className="input-group">
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <label>Password</label>
            </div>

            <div className="input-group">
              <select
                value={loginRole}
                onChange={(e) => setLoginRole(e.target.value)}
                required
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="citizen">Citizen</option>
                <option value="manager">Manager</option>
              </select>
            </div>

            <button type="submit">Login</button>
          </form>
        </div>

        {/* REGISTER */}
        <div className="form-container sign-up">
          <form onSubmit={handleRegister}>
            <h1>Register</h1>

            <div className="input-group">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label>Your Name</label>
            </div>

            <div className="input-group">
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <label>Your Phone Number</label>
            </div>

            <div className="input-group">
              <input
                type="text"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
                required
              />
              <label>Your Address</label>
            </div>

            <div className="input-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label>Your Password</label>
            </div>

            <div className="input-group">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <label>Confirm Password</label>
            </div>

            <button type="submit">Register</button>
          </form>
        </div>

        {/* TOGGLE */}
        <div className="toggle-container">
          <div className="toggle">

            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Please login</p>
              <button type="button" onClick={() => setActive(false)}>
                Login
              </button>
            </div>

            <div className="toggle-panel toggle-right">
              <h1>Hello!</h1>
              <p>If new, register first</p>
              <button type="button" onClick={() => setActive(true)}>
                Register
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Authupage;