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
      <div className="nav-container" >
        <nav class="navbar navbar-expand-lg navbar-light">
          <Link to="#" className="navbar-brand" >Plant Parenthood</Link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                <Link to="/" className="nav-link" >Home</Link>
              </li>
              <li class="nav-item">
                <Link to="/user-profile" className="nav-link" >User Profile</Link>
              </li>
            </ul>
            <Link to="/">
              <button onClick={() => logoutUser(props)} className="btn btn-outline-dark btn-sm">Logout</button>
            </Link>
          </div>
        </nav>
        <div className="mt-3">
          <h4>Hello, {props.userInSession.username} !</h4>
          <hr />
        </div>
      </div>
    );
  } else {
    return (
      <nav>
        <h3>Welcome to Plant Parenthood!</h3>
      </nav>
    );
  }
};

export default Navbar;
