//view for all details of user's collection with two tabs:
//custom fields from user (component)
//api plant details (component) (hides if other component is open vice versa)
import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PlantApiDetails from "./PlantApiDetails";
import PlantCustomFields from "./PlantCustomFields";
import EditPlantDetails from "./EditPlantDetails";
import PlantListOfReminders from "../reminders/PlantListOfReminders";

export default class PlantDetails extends Component {
  state = {
    customComponent: false,
    apiComponent: false,
    reminderComponent: false,
    apiPlant: null,
    userPlant: null,
    loading: true,
    displayEditForm: false,
    displayReminders: false,
  };

  // happens after first render
  componentDidMount() {
    this.getSinglePlant();
  }

  getSinglePlant = () => {
    const { params } = this.props.match;

    axios
      .get(`/api/my-plants/${params.id}/${params.slug}`)
      .then((responseFromApi) => {
        // console.log("RESPONSE", responseFromApi);

        this.setState({
          // apiPlant: { common_name: "Test" }, Use this to test if you don't have data
          apiPlant: responseFromApi.data.apiInfo.data,
          userPlant: responseFromApi.data.ourModel,
          loading: false,
          customComponent: true
        });
      });
  };

  reloadHandler = () => {
    this.setState({
      displayEditForm: false,
    });
    this.componentDidMount(); // reload data
  };

  //use this handler to either hide one component or another with one button
  // showOrHide = () => {
  //   this.setState({
  //     customComponent: !this.state.customComponent,
  //     apiComponent: !this.state.apiComponent,
  //   });
  // };

  // hideRemindersHandler = () => {
  //   this.setState({
  //     displayEditForm: false,
  //   });
  // };

  showApiComponent = () => {
    this.setState({
      apiComponent: true,
      customComponent: false,
      reminderComponent: false,
    });
  };

  showCustomComponent = () => {
    this.setState({
      apiComponent: false,
      customComponent: true,
      reminderComponent: false,
    });
  };

  showReminderComponent = () => {
    this.setState({
      apiComponent: false,
      customComponent: false,
      reminderComponent: true,
    });
  };

  render() {
    // if (this.state.loading) {
    //   return <p> Loading ... </p>;
    // }
    return (
      <div className="single-plant-container mb-4">
        <h2>Plant Details</h2>
        {/* Bootstrap spinner */}
        {this.state.loading && (
          <div className="spinner-border text-light" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
        {!this.state.loading && (
          <div className="buttons-group mb-3">
            {/* shows one tab and hides two others according to above handlers*/}
            <button onClick={this.showCustomComponent} className={"btn btn-outline-dark btn-sm plant-details-btn no-radius-right" + (this.state.customComponent && " active")} >My Notes</button>
            <button onClick={this.showApiComponent} className={"btn btn-outline-dark btn-sm plant-details-btn no-borders-btn no-radius-right no-radius-left" + (this.state.apiComponent && " active")} >About Plant</button>
            <button onClick={this.showReminderComponent} className={"btn btn-outline-dark btn-sm plant-details-btn no-radius-left" + (this.state.reminderComponent && " active")} >Reminders</button>
          </div>
        )}

        {this.state.customComponent && (
          <PlantCustomFields dataFromUser={this.state.userPlant} />
        )}
        {this.state.apiComponent && (
          <PlantApiDetails dataFromApi={this.state.apiPlant} />
        )}
        {this.state.reminderComponent && (
          <PlantListOfReminders
            plantReminders={this.state.userPlant.reminders} />
        )}

        {/* <div>
          {this.state.userPlant && this.state.displayReminders ? (
            <div>
              <button
                onClick={() => this.setState({ displayReminders: false })}
              >
                Hide Reminders
              </button>
              <PlantListOfReminders
                plantReminders={this.state.userPlant.reminders}
                hideReminders={this.hideRemindersHandler}
              />
            </div>
          ) : (
            <button onClick={() => this.setState({ displayReminders: true })}>
              Show Reminders
            </button>
          )}
        </div> */}
        <Link to="/my-plants" className="btn btn-outline-secondary btn-sm green-link mb-4">Back to Collection</Link>
        <div>
          {this.state.userPlant && this.state.displayEditForm ? (
            <div>
              <button onClick={() => this.setState({ displayEditForm: false })}>
                Close Edit Plant
              </button>
              <EditPlantDetails
                customPlantFields={this.state.userPlant}
                reloadHandler={this.reloadHandler}
              />
            </div>
          ) : (
              <button onClick={() => this.setState({ displayEditForm: true })} className="btn btn-primary btn-sm">
                Edit Your Plant
              </button>
            )}
        </div>
      </div>
    );
  }
}
