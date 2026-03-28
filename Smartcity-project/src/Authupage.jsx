import { useState } from "react";
import "./App.css";

const Authupage = () => {
  const [active, setActive] = useState(false);

  return (
    <div className={`container ${active ? "active" : ""}`}>


      <div className="form-container sign-in">
        <form>
          <h1>Login</h1>

          <input type="text" placeholder="Name" required />
          <input type="password" placeholder="Password" required />
          <select required>
            <option value="">Select the role</option>
            <option value="">Admin</option>
            <option value="">User</option>
            <option value="">Officer</option>

          </select>

          <button type="button" onClick={() => setActive(false)}>
            Login
          </button>
        </form>
      </div>


      <div className="form-container sign-up">
        <form>
          <h1>Register</h1>

          <input type="text" placeholder="Name" required />
          <input type="number" placeholder="Phone Number" required/>
          <input type="password" placeholder="Password" required/>
          <input type="password" placeholder="Conform Password" required/>

          <button type="button" onClick={() => setActive(true)}>
            Register
          </button>


        </form>
      </div>


      <div className="toggle-container">
        <div className="toggle">

          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your details to login</p>
            <button onClick={() => setActive(false)}>Login</button>
          </div>

          <div className="toggle-panel toggle-right">
            <h1>Hello Friend!</h1>
            <p>Register to get started</p>
            <button onClick={() => setActive(true)}>Register</button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Authupage;