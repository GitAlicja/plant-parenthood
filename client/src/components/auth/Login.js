import React, { Component } from "react";
import { login } from "../../api";
import { Link } from "react-router-dom";

class Login extends Component {
  state = { username: "", password: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    login(username, password)
      .then((response) => {
        this.setState({ username: "", password: "" });
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

          <input type="submit" value="Login" />
        </form>
        <p>
          Don't have account?
          <Link to={"/signup"}> Signup</Link>
        </p>
      </div>
    );
  }
}

export default Login;
