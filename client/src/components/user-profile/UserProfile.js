import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../App.css";

import EditUserProfile from "./EditUserProfile";

class UserProfile extends React.Component {
  state = {
    user: null,
    loading: true,
    displayEditForm: false,
  };

  componentDidMount() {
    axios.get("/api/user-profile").then((resp) => {
      this.setState({
        user: resp.data,
        loading: false,
      });
    });
  }

  reloadHandler = () => {
    this.setState({
      // loading: true,
      displayEditForm: false,
    });
    this.componentDidMount(); // reload data
  };

  render() {
    return (
      <div className="userprofile-container">
        {/* Bootstrap spinner */}
        {this.state.loading && (
          <div className="spinner-border text-light" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
        <div className="single-reminder-innerbox shadow p-3 mb-4 bg-body rounded">
          {this.state.user && (
            <div>
              {/* default image can be changed in the edit form */}
              <img
                src={this.state.user.profileImg || "/images/user.png"}
                alt="user profile"
                className="user-profile-image"
              />
              {/* <h4>Welcome, {this.state.user.username}</h4> */}
              <p>Your username: {this.state.user.username} </p>
              <p>Your email: {this.state.user.email}</p>
              <br />
              <div className="btn-group">
                <Link
                  className="btn btn-outline-secondary btn-sm green-link mb-3"
                  to="/my-plants"
                >
                  Your Plants Collection
                </Link>
                <br />
                <Link
                  className="btn btn-outline-secondary btn-sm green-link mb-3"
                  to="/search"
                >
                  Search Plants
                </Link>
              </div>
            </div>
          )}
        </div>

        {this.state.user && this.state.displayEditForm ? (
          <div>
            <button
              className="btn btn-primary"
              onClick={() => this.setState({ displayEditForm: false })}
            >
              Close
            </button>
            <EditUserProfile
              theUser={this.state.user}
              reloadHandler={this.reloadHandler}
            />
          </div>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => this.setState({ displayEditForm: true })}
          >
            Edit Profile
          </button>
        )}
      </div>
    );
  }
}

export default UserProfile;
