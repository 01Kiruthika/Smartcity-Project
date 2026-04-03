import { useContext, useState, useRef, useEffect } from "react";
import { UserName } from "../App";
import { useNavigate } from "react-router-dom";
import logo from "../Images/user.png";
import "../App.css";

const Header = () => {
  const { currentUserName } = useContext(UserName);
  const navigate = useNavigate();
  let profileRef = useRef()

  const [showProfile, setShowProfile] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);

  const [name, setName] = useState(currentUserName);
  const [phone, setPhone] = useState("0000000000");
  const [image, setImage] = useState(logo);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");


  useEffect(() => {
    let handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };


    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEditProfile = () => {
    setEditMode(true);
    setPasswordMode(false);
  };
  const handleChangePassword = () => {
    setPasswordMode(true);
    setEditMode(false);
  };
  const handleLogout = () => {

    // redirect
    navigate("/");
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };
  return (
    <header>
      <h2>Welcome, {currentUserName}</h2>

      <div className="profile-container" ref={profileRef}>

        {/* ICON */}
        <img
          src={logo}
          alt="user"
          className="profile-icon"
          onClick={() => setShowProfile((prev) => !prev)}
        />


        {showProfile && (
          <div className="profile-dropdown">

            {/* TOP USER INFO */}
            <div className="profile-header">
              <img src={image} alt="user" className="avatar" />
              <div>
                <h4>{name}</h4>
                <p>{phone}</p>
              </div>
            </div>

            <hr />

            {/* MENU OPTIONS */}
            {!editMode && !passwordMode && (
              <div className="menu">
                <button onClick={handleEditProfile}> Edit Profile</button>
                <button onClick={handleChangePassword}> Change Password</button>
                <button className="logout" onClick={handleLogout}>
                   Logout
                </button>
              </div>
            )}

            {/* EDIT PROFILE */}
            {editMode && (
              <div className="form-section">
                <h4>Edit Profile</h4>

                <div className="avatar-upload">
                  <img src={image} alt="preview" />
                  <input type="file" onChange={handleImageChange} />
                </div>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />

                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone"
                />

                <div className="btn-group">
                  <button onClick={() => setEditMode(false)}>Save</button>
                  <button onClick={() => setEditMode(false)}>Cancel</button>
                </div>
              </div>
            )}

            {/* CHANGE PASSWORD */}
            {passwordMode && (
              <div className="form-section">
                <h4>Change Password</h4>

                <input
                  type="password"
                  placeholder="Old Password"
                  onChange={(e) => setOldPassword(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="New Password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <div className="btn-group">
                  <button onClick={() => setPasswordMode(false)}>Update</button>
                  <button onClick={() => setPasswordMode(false)}>Cancel</button>
                </div>
              </div>
            )}

          </div>
        )}


        {/* <button>Change Password</button>
            <button onClick={Editprofile}>Edit Profile</button> */}

        {/* <button className="logout"><i class="fa fa-sign-out" aria-hidden="true"></i>Logout</button> */}
      </div>
    </header>
  );
};


export default Header;