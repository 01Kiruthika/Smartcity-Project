import React, { useContext, useReducer, useRef, useEffect } from "react";
import { UserName } from "../App";
import { useNavigate } from "react-router-dom";
import logo from "../Images/user.png";
import logout from "../Images/user-logout.png";
import "../App.css";

const initialState = {
  showProfile: false,
  editMode: false,
  passwordMode: false,

  name: "",
  phone: "0000000000",
  image: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_PROFILE":
      return { ...state, showProfile: !state.showProfile };

    case "EDIT_MODE":
      return { ...state, editMode: true, passwordMode: false };

    // case "PASSWORD_MODE":
    //   return { ...state, passwordMode: true, editMode: false };

    case "SET_NAME":
      return { ...state, name: action.payload };

    case "SET_PHONE":
      return { ...state, phone: action.payload };

    case "SET_IMAGE":
      return { ...state, image: action.payload };

    // case "SET_OLD_PASSWORD":
    //   return { ...state, oldPassword: action.payload };

    // case "SET_NEW_PASSWORD":
    //   return { ...state, newPassword: action.payload };

    case "CLOSE_ALL":
      return { ...state, editMode: false, passwordMode: false };

    case "CLOSE_PROFILE":
      return { ...state, showProfile: false };

    default:
      return state;
  }
}

const Header = () => {
  const { currentUserName } = useContext(UserName);
  const navigate = useNavigate();
  const profileRef = useRef();

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    name: currentUserName,
    image: logo,
  });



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        dispatch({ type: "CLOSE_PROFILE" });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const handleEditProfile = () => {
    dispatch({ type: "EDIT_MODE" });
  };

  const handleChangePassword = () => {
    dispatch({ type: "PASSWORD_MODE" });
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch({
        type: "SET_IMAGE",
        payload: URL.createObjectURL(file),
      });
    }
  };

  return (
    <header>

      <div className="company-name">
        <label for="click-bars">
          <i class="fa fa-bars" aria-hidden="true"></i>
        </label>
      </div>
      <h2>Welcome, {currentUserName}</h2>


      <div className="profile-container" ref={profileRef}>


        <img
          src={state.image}
          alt="user"
          className="profile-icon"
          onClick={() => dispatch({ type: "TOGGLE_PROFILE" })}
        />

        <div className={`profile-dropdown ${state.showProfile ? "active" : ""}`}>


          <div className="profile-header">
            <img src={state.image} alt="user" className="avatar" />
            <div>
              <h4>{state.name}</h4>
              <p>{state.phone}</p>
            </div>
          </div>

          <hr />


          {!state.editMode && !state.passwordMode && (
            <div className="menu">
              <button onClick={handleEditProfile}> Edit Profile</button>
              {/* <button onClick={handleChangePassword}> Change Password</button> */}
              <button className="logout" onClick={handleLogout}>
                <img src={logout} alt="" />   Logout
              </button>
            </div>
          )}


          {state.editMode && (
            <div className="form-section">
              <h4>Edit Profile</h4>

              <div className="avatar-upload">
                <img src={state.image} alt="preview" />
                <input type="file"
                  onChange={handleImageChange}
                />
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  dispatch({ type: "CLOSE_ALL" });
                }}
              >
                <input
                  type="text"
                  value={state.name}
                  onChange={(e) =>
                    dispatch({ type: "SET_NAME", payload: e.target.value })
                  }
                  placeholder="Name"
                  required
                />

                <input
                  type="text"
                  value={state.phone}
                  onChange={(e) =>
                    dispatch({ type: "SET_PHONE", payload: e.target.value })
                  }
                  placeholder="Phone Number"
                  required
                />

                <div className="btn-group">
                  <button type="submit">
                    Save
                  </button>
                  <button type="submit">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* CHANGE PASSWORD */}
          {state.passwordMode && (
            <div className="form-section">
              <h4>Change Password</h4>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  dispatch({ type: "CLOSE_ALL" });
                }}
              >
                <input
                  type="password"
                  placeholder="Old Password"
                  onChange={(e) =>
                    dispatch({
                      type: "SET_OLD_PASSWORD",
                      payload: e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="password"
                  placeholder="New Password"
                  onChange={(e) =>
                    dispatch({
                      type: "SET_NEW_PASSWORD",
                      payload: e.target.value,
                    })
                  }
                  required
                />

                <div className="btn-group">
                  <button type="submit">
                    Update
                  </button>
                  <button type="submit">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </header>
  );
};

export default Header;