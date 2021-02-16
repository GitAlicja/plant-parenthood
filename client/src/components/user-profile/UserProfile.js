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
      <div className="single-user-container mb-4">
        {/* Bootstrap spinner */}
        {this.state.loading && (
          <div className="spinner-border text-light" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}

        {this.state.user && (
          <div className="single-user-innerbox shadow p-3 mb-4 bg-body rounded">
            {/* default image can be changed in the edit form */}
            <img src={this.state.user.profileImg || "/images/user.png"} alt="user profile" className="user-profile-image mb-3" />
            <h5>
              <span className="yellow-headline">Username:</span> {this.state.user.username}</h5>
            <h6><span className="yellow-headline">Email:</span> {this.state.user.email}</h6>
          </div>
        )}
        <br />
        <div>
          <Link to="/my-plants" className="btn btn-outline-secondary btn-sm green-link mb-4 mx-2">Your Collection</Link>
          <Link to="/search" className="btn btn-outline-secondary btn-sm green-link mb-4 mx-2">Search Plants</Link>
        </div>
        {this.state.user && this.state.displayEditForm ? (
          <div>
            <button onClick={() => this.setState({ displayEditForm: false })} type="button" className="btn btn-outline-dark btn-sm">Close Form</button>
            <EditUserProfile theUser={this.state.user} reloadHandler={this.reloadHandler} />
          </div>
        ) : (
            <button onClick={() => this.setState({ displayEditForm: true })} type="button" className="btn btn-primary btn-sm">Edit Profile</button>
          )}
      </div>
    );
  }
}

export default UserProfile;
