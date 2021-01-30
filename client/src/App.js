import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import PlantDetails from "./components/plants/PlantDetails";

import Navbar from "./components/basic-structure/Navbar";
import TrefleSearchResults from "./components/trefle-search/TrefleSearchResults";
import AddPlant from "./components/plants/AddPlant";
import TrefleSearchDetails from "./components/trefle-search/TrefleSearchDetails";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: props.user };
  }

  updateTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj,
    });
  };

  render() {
    return (
      <div className="App">
        <Route path="/my-plants/detail/:id/:slug" component={PlantDetails} />
        <Navbar
          userInSession={this.state.loggedInUser}
          updateUser={this.updateTheUser}
        />
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
          <Route exact path="/search" component={TrefleSearchResults} />
          <Route path="/search/detail/:slug" component={TrefleSearchDetails} />
          <Route exact path="/add-plant/:slug" component={AddPlant} />
        </Switch>
      </div>
    );
  }
}

export default App;
