import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";

import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";

import Home from "./components/basic-structure/Home";
import Navbar from "./components/basic-structure/Navbar";
import Footer from "./components/basic-structure/Footer";

import TrefleSearchResults from "./components/trefle-search/TrefleSearchResults";
import TrefleSearchDetails from "./components/trefle-search/TrefleSearchDetails";

import AddPlant from "./components/plants/AddPlant";
import PlantDetails from "./components/plants/PlantDetails";
import PlantCollection from "./components/plants/PlantCollection";

import ListOfReminders from "./components/reminders/ListOfReminders";
import AddReminder from "./components/reminders/AddReminder";
import SingleReminder from "./components/reminders/SingleReminder";

import UserProfile from "./components/user-profile/UserProfile";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: this.props.user };
  }

  updateTheUser = (userObjFromBackend) => {
    this.setState({
      loggedInUser: userObjFromBackend,
    });
  };

  render() {
    return (
      <div className="App">
        <Navbar userInSession={this.state.loggedInUser} updateUser={this.updateTheUser} />

        <Switch>
          <Route exact path="/signup" render={() => {
            if (this.state.loggedInUser) {
              return <Home />;
            } else {
              return <Signup updateUser={this.updateTheUser} />
            }
          }}
          />
          <Route exact path="/" render={() => {
            if (this.state.loggedInUser) {
              return <Home />;
            } else {
              return <Login updateUser={this.updateTheUser} />;
            }
          }}
          />

          <Route exact path="/search" render={routerProps => !this.state.loggedInUser ? (<Redirect to="/" />) : (<TrefleSearchResults  {...routerProps} />)} />

          <Route exact path="/search/detail/:slug" render={routerProps => !this.state.loggedInUser ? (<Redirect to="/" />) : (<TrefleSearchDetails {...routerProps} />)} />

          <Route exact path="/add-plant/:slug" render={routerProps => !this.state.loggedInUser ? (<Redirect to="/" />) : (<AddPlant {...routerProps} />)} />

          <Route exact path="/my-plants" render={routerProps => !this.state.loggedInUser ? (<Redirect to="/" />) : (<PlantCollection {...routerProps} />)} />

          <Route exact path="/my-plants/detail/:id/:slug" render={routerProps => !this.state.loggedInUser ? (<Redirect to="/" />) : (<PlantDetails {...routerProps} />)} />

          <Route exact path="/reminders" render={routerProps => !this.state.loggedInUser ? (<Redirect to="/" />) : (<ListOfReminders {...routerProps} />)} />

          <Route exact path="/add-reminder/:plantID" render={routerProps => !this.state.loggedInUser ? (<Redirect to="/" />) : (<AddReminder {...routerProps} />)} />

          <Route exact path="/reminders/:id" render={routerProps => !this.state.loggedInUser ? (<Redirect to="/" />) : (<SingleReminder {...routerProps} />)} />

          <Route exact path="/user-profile" render={routerProps => !this.state.loggedInUser ? (<Redirect to="/" />) : (<UserProfile {...routerProps} updateTheUser={this.updateTheUser} />)} />

        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
