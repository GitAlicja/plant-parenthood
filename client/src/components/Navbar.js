import React from "react";
import { Link } from "react-router-dom";
import { logout } from "./auth/Logout";

const logoutUser = (props) => {
  logout().then(() => {
    props.updateUser(null); // sets the global user object to 'null'
  });
};

const navbar = (props) => {
  if (props.userInSession) {
    return (
      <nav className="nav-style">
        <ul>
          <li>Welcome, {props.userInSession.username}</li>
          <li>
            {/* <Link to="/my-plans" style={{ textDecoration: "none" }}>
              My Plant Collection
            </Link> */}
          </li>
          <li>
            <Link to="/">
              <button onClick={() => logoutUser(props)}>Logout</button>
            </Link>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <div>
        <nav className="nav-style">
          <ul>
            <li>
              <Link to="/" style={{ textDecoration: "none" }}>
                Login
              </Link>
            </li>

            <li>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                Signup
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
};

export default navbar;
