import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { UserName } from "./App.jsx";

const Authupage = () => {
  const [active, setActive] = useState(false);
 const { setCurrentUserName, setRole } = useContext(UserName);
  const navigate = useNavigate();

  // LOGIN STATES
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginRole, setLoginRole] = useState("");

  // REGISTER STATES
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // REGISTER
  const handleRegister = (e) => {
    e.preventDefault();

    if (phone.length !== 10) {
      alert("Enter valid 10 digit phone number!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password not match");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = existingUsers.find((user) => user.name === name);

    if (userExists) {
      alert("User already exists!");
      return;
    }

    const newUser = { name, phone, password };
    existingUsers.push(newUser);

    localStorage.setItem("users", JSON.stringify(existingUsers));

    alert("Registered Successfully!");
    setActive(false);

    setName("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
  };

  // LOGIN
  const handleLogin = (e) => {
    e.preventDefault();

    if (
      loginName === "admin" &&
      loginPassword === "admin" &&
      loginRole === "admin"
    ) {
      alert("Admin Login Success");

      setCurrentUserName("Admin");
      setRole("admin");

      navigate("/admin");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users"));

    if (!users || users.length === 0) {
      alert("Please register first!");
      return;
    }

    const validUser = users.find(
      (user) =>
        user.name === loginName && user.password === loginPassword
    );

    if (validUser && loginRole === "citizen") {
      alert("User Login Success!");

      setCurrentUserName(validUser.name);  //  USER NAME SET
      setRole("citizen");

      navigate("/admin"); // same layout
    } else {
      alert("Invalid credentials or role!");
    }

    setLoginName("");
    setLoginPassword("");
  };

  return (
    <div className="main-container">


      <div className={`container ${active ? "active" : ""}`}>

        {/* LOGIN */}
        <div className="form-container sign-in">
          <form onSubmit={handleLogin}>
            <h1>Login</h1>

            <input
              type="text"
              placeholder="Name"
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />

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

            <button type="submit">Login</button>
          </form>
        </div>

        {/* REGISTER */}
        <div className="form-container sign-up">
          <form onSubmit={handleRegister}>
            <h1>Register</h1>

            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button type="submit">Register</button>
          </form>
        </div>

        {/* TOGGLE */}
        <div className="toggle-container">
          <div className="toggle">

            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Please login and after register</p>
              <button type="button" onClick={() => setActive(false)}>
                Login
              </button>
            </div>

            <div className="toggle-panel toggle-right">
              <h1>Hello!</h1>
              <p>If you are a New one Please Register first!!</p>
              <button type="button" onClick={() => setActive(true)}>
                Register Here
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Authupage;