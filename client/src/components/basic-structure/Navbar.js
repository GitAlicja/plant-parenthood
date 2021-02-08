import React from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import { logout } from "../../api";

const logoutUser = (props) => {
  logout().then(() => {
    props.updateUser(null); // sets the global user object to 'null'
  });
};

const Navbar = (props) => {
  if (props.userInSession) {
    return (
      <nav>
        <div>
          <ul>
            <li>
              <Link to="/user-profile" >User Profile</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">
                <button onClick={() => logoutUser(props)}>Logout</button>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3>Hello, {props.userInSession.username} !</h3>
        </div>
      </nav>
    );
  } else {
    return (
      <div>
        <nav>
        <h3>Welcome to Plant Parenthood!</h3>
        </nav>
      </div>
    );
  }
};

export default Navbar;
