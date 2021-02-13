import React, { Component } from "react";
import { signup } from "../../api";
import { Link } from "react-router-dom";
import "../../App.css";
// import axios from "axios";

class Signup extends Component {
  state = {
    username: "",
    password: "",
    email: "",
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const email = this.state.email;

    //   axios.post("/api/signup", { username, password, email }).then((resp) => {
    //     this.setState({ username: "", password: "", email: "" });
    //     this.props.updateTheUser(resp.data);
    //   });
    // };

    signup(username, password, email)
      .then((response) => {
        this.setState({
          username: "",
          password: "",
          email: "",
        });
        this.props.updateUser(response);
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className="signup-photo">
        <div className="form-container">
          <form onSubmit={this.handleFormSubmit}>
            <h2>Create an account</h2>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label" for="username">
                Username:
              </label>
              <div className="col-7">
                <input
                  type="text"
                  name="username"
                  placeholder="Enter Username"
                  value={this.state.username}
                  onChange={(e) => this.handleChange(e)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label" for="password">
                Password:
              </label>
              <div className="col-7">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={this.state.password}
                  onChange={(e) => this.handleChange(e)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label" for="email">
                Email:
              </label>
              <div className="col-7">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={(e) => this.handleChange(e)}
                  className="form-control"
                />
              </div>
            </div>

            {/* Should go to user-profile edit page */}
            <input type="submit" value="Signup" />
            {/* <button onClick={this.handleFormSubmit} className="btn btn-primary">
              Sign up{" "}
            </button> */}
            <br></br>

            <div>
              <p>
                Already have an account? <br></br>
                <Link to={"/"}>Login here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
