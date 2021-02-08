import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../App.css";

import EditUserProfile from "./EditUserProfile";

class UserProfile extends React.Component {

  state = {
    user: null,
    loading: true,
    displayEditForm: false
  };

  componentDidMount() {
    axios
      .get("/api/user-profile")
      .then(resp => {
        this.setState({
          user: resp.data,
          loading: false
        });
      });
  };

  reloadHandler = () => {
    this.setState({
      // loading: true,
      displayEditForm: false
    });
    this.componentDidMount(); // reload data
  };

  render() {
    return (
      <div>
        {/* Bootstrap spinner */}
        {this.state.loading && (<div className="spinner-border text-light" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        )}

        {this.state.user && (
          <div>
            {/* default image can be changed in the edit form */}
            <img src={this.state.user.profileImg || "/images/user.png"} alt="user profile" className="user-prifile-image" />
            <h4>Welcome, {this.state.user.username}</h4>
            <p>Your email: {this.state.user.email}</p>
            <br />
            <Link to="/my-plants">Your Plants Collection</Link>
            <br />
            <Link to="/search">Search Plants</Link>
          </div>
        )}
        <br />
        <br />
        {this.state.user && this.state.displayEditForm ?
          (<div>
            <button onClick={() => this.setState({ displayEditForm: false })}>Close</button>
            <EditUserProfile theUser={this.state.user} reloadHandler={this.reloadHandler} />
          </div>) :
          (<button onClick={() => this.setState({ displayEditForm: true })}>Edit Profile</button>)}
      </div>
    );
  };
}

export default UserProfile;