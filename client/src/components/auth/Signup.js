import React, { Component } from "react";
import { signup } from "../../api";
import { Link } from "react-router-dom";
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
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={(e) => this.handleChange(e)}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={(e) => this.handleChange(e)}
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={(e) => this.handleChange(e)}
          />

          {/* Should go to user-profile edit page */}
          <input type="submit" value="Signup" />
        </form>

        <p>
          Already have an account?
          <Link to={"/"}>Login here</Link>
        </p>
      </div>
    );
  }
}

export default Signup;
