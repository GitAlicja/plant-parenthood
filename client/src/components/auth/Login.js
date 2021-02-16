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
      <div className="signup-photo mb-4">
        <div className="form-container">
          <form onSubmit={this.handleFormSubmit}>
            <h2>Login</h2>

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
            {/* <input type="submit" value="Login" />
            <br></br> */}
            <button onClick={this.submitHandler} className="btn btn-primary btn-sm mb-4 mt-2">Login</button>
            <p>Don't have account?</p>
            <Link className="btn btn-outline-secondary btn-sm green-link mb-3" to={"/signup"}>Signup</Link>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
