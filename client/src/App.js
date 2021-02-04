import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Navbar from "./components/basic-structure/Navbar";

import TrefleSearchResults from "./components/trefle-search/TrefleSearchResults";
import TrefleSearchDetails from "./components/trefle-search/TrefleSearchDetails";

import AddPlant from "./components/plants/AddPlant";
import PlantDetails from "./components/plants/PlantDetails";
import PlantCollection from "./components/plants/PlantCollection";

import ListOfReminders from "./components/reminders/ListOfReminders";
import AddReminder from "./components/reminders/AddReminder";
import SingleReminder from "./components/reminders/SingleReminder";

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
        <Navbar
          userInSession={this.state.loggedInUser}
          updateUser={this.updateTheUser}
        />
        <Route
          exact
          path="/my-plants/detail/:id/:slug"
          component={PlantDetails}
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
          <Route exact path="/my-plants" component={PlantCollection} />
          <Route exact path="/reminders" component={ListOfReminders} />
          <Route exact path="/add-reminder/:plantID" component={AddReminder} />
          <Route exact path="/reminders/:id" component={SingleReminder} />
        </Switch>
      </div>
    );
  }
}

export default App;
