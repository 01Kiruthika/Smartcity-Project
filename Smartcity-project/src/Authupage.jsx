import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { UserName } from "./App.jsx";

const Authupage = () => {
  const [active, setActive] = useState(false);//TOOGLE LOGIN AND REGISTER SCREEN
  const { setCurrentUserName, setRole } = useContext(UserName);//CHANGE NAME IN HEADER
  const navigate = useNavigate();// TO NAVIGATTE DASHBOARD PAGE

  // LOGIN STATES
  const [loginPhone, setLoginPhone] = useState("");//LOGIN NAME
  const [loginPassword, setLoginPassword] = useState("");//LOGIN PASS
  const [loginRole, setLoginRole] = useState("");// FOR ROLE PURPOSE

  // REGISTER STATES
  const [name, setName] = useState("");// NEW NAME
  const [phone, setPhone] = useState("");//NEW PHONE
  const [address, setaddress] = useState("");//NEW PHONE
  const [password, setPassword] = useState("");//NEW PASS
  const [confirmPassword, setConfirmPassword] = useState("");//NEW CONFORM PASS

  // REGISTER
  let handleRegister = async (e) => {
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
      name: name,
      phonenumber: phone,
      address: address,
      password: password,
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

      console.log("API Response:", data);

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
      console.error("Error:", error);
      alert("Server Error");
    }
  };

  // LOGIN
  let handleLogin = async (e) => {
    e.preventDefault();

    if (!loginRole) {
      alert("Please select a role!");
      return;
    }

    const loginData = {
      phonenumber: loginPhone,
      password: loginPassword,
      role: loginRole.toLowerCase()
    };

    console.log(loginData);

    try {
      const response = await fetch("http://localhost:8011/userlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      console.log("Login Response:", data);

      if (data.status === true) {
        alert("Login Success ");

        // set username & role
        setCurrentUserName(data.response.name);
        setRole(data.response.role);

        localStorage.setItem("userId", data.response._id)

        navigate("/app");

      } else {
        alert(data.message || "Invalid Credentials");
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Server Error ");
    }

    // clear fields
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
                placeholder=" "
                value={loginPhone}
                onChange={(e) => setLoginPhone(e.target.value)}
                required
              />
              <label>Phone Number</label>
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
                type="text"
                placeholder=" "
                value={address}
                onChange={(e) => setaddress(e.target.value)}
                required
              />
              <label>Your Address</label>
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