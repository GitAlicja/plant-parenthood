import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Signup from "./components/auth/Signup";

class App extends React.Component {
  state = {
    loggedInUser: null,
  };

  updateTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj,
    });
  };
  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/signup"
            render={() => <Signup updateUser={this.updateTheUser} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
