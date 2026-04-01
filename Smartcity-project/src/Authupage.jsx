import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { UserName } from "./App.jsx";

const Authupage = () => {
  const [active, setActive] = useState(false);//TOOGLE LOGIN AND REGISTER SCREEN
  const { setCurrentUserName, setRole } = useContext(UserName);//CHANGE NAME IN HEADER
  const navigate = useNavigate();// TO NAVIGATTE DASHBOARD PAGE

  // LOGIN STATES
  const [loginName, setLoginName] = useState("");//LOGIN NAME
  const [loginPassword, setLoginPassword] = useState("");//LOGIN PASS
  const [loginRole, setLoginRole] = useState("");// FOR ROLE PURPOSE

  // REGISTER STATES
  const [name, setName] = useState("");// NEW NAME
  const [phone, setPhone] = useState("");//NEW PHONE
  const [password, setPassword] = useState("");//NEW PASS
  const [confirmPassword, setConfirmPassword] = useState("");//NEW CONFORM PASS

  // REGISTER
  let handleRegister = (e) => {
    debugger;
    e.preventDefault();

    if (phone.length !== 10) {
      alert("Enter valid 10 digit phone number!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password not match");
      return;
    }

    let existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    let userExists = existingUsers.find((user) => user.phone === phone);

    if (userExists) {
      alert("User already exists!");
      return;
    }

    let newUser = { name, phone, password };
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
  let handleLogin = (e) => {
    e.preventDefault();
    debugger

    let users = JSON.parse(localStorage.getItem("users")) || [];

    switch (loginRole) {
      // ADMIN 
      case "admin":
        if (loginName === "admin" && loginPassword === "admin") {
          alert("Admin Login Success");

          setCurrentUserName("Admin");
          setRole("admin");

          navigate("/admin");
        } else {
          alert("Invalid Admin Credentials!");
        }
        break;

      // CITIZEN 
      case "citizen":
        if (users.length === 0) {
          alert("Please register first!");
          break;
        }

        let validUser = users.find(
          (user) =>
            user.name === loginName && user.password === loginPassword
        );

        if (validUser) {
          alert("User Login Success!");

          setCurrentUserName(validUser.name);
          setRole("citizen");

          navigate("/admin");
        } else {
          alert("Invalid User Credentials!");
        }
        break;

      // MANAGER 
      case "manager":
        if (users.length === 0) {
          alert("Please register first!");
          break;
        }

        let manageruser= users.find(
          (user) =>
            user.name === loginName && user.password === loginPassword
        );

        if (manageruser) {
          alert("Manager Login Success!");

          setCurrentUserName(manageruser.name);
          setRole("manager");

          navigate("/admin");
        } else {
          alert("Invalid  Credentials!");
        }
        break;


      default:
        alert("Please select a role!");
    }


    setLoginName("");
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
                type="text"
                placeholder=" "
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                required
              />
              <label>Name</label>
            </div>


            <div className="input-group">
              <input
                type="password"
                placeholder=" "
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
                placeholder=" "
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label>Your Name</label>
            </div>


            <div className="input-group">
              <input
                type="number"
                placeholder=" "
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <label>Your Phone Number</label>
            </div>



            <div className="input-group">
              <input
                type="password"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label>Your Password</label>
            </div>


            <div className="input-group">
              <input
                type="password"
                placeholder=" "
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <label>Your Conform Password</label>
            </div>

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
      </div >
    </div >
  );
};

export default Authupage;