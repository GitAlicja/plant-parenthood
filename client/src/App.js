import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Navbar from "./components/Navbar";
import PlantDetails from "./components/plants/PlantDetails";
import TrefleSearchDetails from "./components/trefle-search/TrefleSearchDetails";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: this.props.user };
  }

  updateTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj,
    });
  };
  render() {
    return (
      <div className="App">
        <Navbar
          userInSession={this.state.loggedInUser}
          updateUser={this.updateTheUser}
        />
        <Route path="/search/detail/:id/:slug" component={PlantDetails} />

        <Switch>
          {/* <Route exact path="/signup" component={Signup} /> */}
          <Route
            exact
            path="/signup"
            render={() => <Signup updateUser={this.updateTheUser} />}
          />

          <Route
            exact
            path="/"
            render={() => <Login updateUser={this.updateTheUser} />}
          />

          <Route path="/search/detail/:slug" component={TrefleSearchDetails} />
        </Switch>
      </div>
    );
  }
}

export default App;
