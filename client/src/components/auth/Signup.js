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
    error: null
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

    // to reset when the form was sent again
    this.setState({ error: null });

    signup(username, password, email)
      .then((response) => {
        this.setState({
          username: "",
          password: "",
          email: "",
        });
        this.props.updateUser(response);
      })
      .catch((error) => {
        if (error.response.status === 400 && error.response.data.message) {
          this.setState({
            error: error.response.data.message
          });
        } else if (error.response.status === 500) {
          this.setState({
            error: "Something went wrong. Try again!"
          });
        }
        console.error(error);
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className="signup-photo mb-4">
      {this.state.error && (<div className="alert alert-danger">{this.state.error}</div>)}
        <div className="form-container">
          <form onSubmit={this.handleFormSubmit}>
            <h2>Create an account</h2>
            
            <div className="form-group row">
              <label className="col-sm-5 col-form-label" htmlFor="username">
                Username:
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={(e) => this.handleChange(e)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-5 col-form-label" htmlFor="password">
                Password:
              </label>
              <div className="col-sm-7">
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={(e) => this.handleChange(e)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-5 col-form-label" htmlFor="email">
                Email:
              </label>
              <div className="col-sm-7">
                <input
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={(e) => this.handleChange(e)}
                  className="form-control"
                />
              </div>
            </div>

            {/* Should go to user-profile edit page */}
            {/* <input type="submit" value="Signup" /> */}
            <button onClick={this.handleFormSubmit} className="btn btn-primary btn-sm mb-4 mt-2">Sign up</button>
            <div>
              <p>Already have an account?</p>
              <Link className="btn btn-outline-secondary btn-sm green-link mb-3" to={"/"}>Login here</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
