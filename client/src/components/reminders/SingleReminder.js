import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../App.css";
import EditReminder from "./EditReminder";

class SingleReminder extends React.Component {
  state = {
    reminder: null,
    loading: true,
    displayEditForm: false,
  };

  componentDidMount() {
    // id like in the App.js Route path='/reminders/:id'
    const reminderId = this.props.match.params.id;

    axios.get("/api/reminders/" + reminderId).then((resp) => {
      this.setState({
        reminder: resp.data,
        loading: false,
      });
    });
  }

  reloadHandler = () => {
    this.setState({
      // loading: true,
      displayEditForm: false,
    });
    this.componentDidMount(); // reload data
  };

  deleteReminder = () => {
    const reminderId = this.props.match.params.id;
    axios.delete("/api/reminders/" + reminderId).then(() => {
      this.props.history.push("/reminders");
    });
  };

  // first render action happens with value null for the beer property (initial state value)
  // you will need if else statement or setTimeout inside setState (inside promise)
  render() {
    let typeOfCareIcon = "";
    if (this.state.reminder) {
      if (this.state.reminder.typeOfCare === "Water") {
        typeOfCareIcon = "/images/water-drop.png";
      } else if (this.state.reminder.typeOfCare === "Fertilize") {
        typeOfCareIcon = "/images/fertilizer.png";
      } else if (this.state.reminder.typeOfCare === "Repot") {
        typeOfCareIcon = "/images/plant-pot.png";
      } else if (this.state.reminder.typeOfCare === "Insecticide") {
        typeOfCareIcon = "/images/anti-flea.png";
      } else if (this.state.reminder.typeOfCare === "Trim") {
        typeOfCareIcon = "/images/scissors.png";
      }
    }

    return (
      <div className="single-reminder-container mb-4">
        <h2>Remind me to...</h2>
        {/* Bootstrap spinner */}
        {this.state.loading && (
          <div className="spinner-border text-light" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}

        <div className="single-reminder-innerbox shadow p-3 mb-4 bg-body rounded">
          {/* first data has to be there (loaded) */}
          {/* if data is not there you would try to show for example this.state.reminder.null instead of this.state.reminder.reminderDate and example this.state.reminder.null will always cause errors */}
          {this.state.reminder && (
            <div>
              <div>
                <h4 className="green-headline">
                  {this.state.reminder.typeOfCare}{" "}
                  {this.state.reminder.plant.name}
                </h4>
                <p className="reminder-date">
                  on{" "}
                  {new Date(
                    this.state.reminder.reminderDate
                  ).toLocaleDateString("en-GB", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p>
                  Remind me at{" "}
                  {new Date(
                    this.state.reminder.reminderDate
                  ).toLocaleTimeString("en-GB", {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </p>
                <p>
                  Set for every {this.state.reminder.frequency}{" "}
                  {this.state.reminder.unit}
                </p>
              </div>
            </div>
          )}
        </div>
        <Link
          to="/reminders"
          className="btn btn-outline-secondary btn-sm green-link mb-4"
        >
          Back to Reminders
        </Link>
        <div>
          {this.state.reminder && this.state.displayEditForm ? (
            <div>
              <button
                onClick={() => this.setState({ displayEditForm: false })}
                className="btn btn-outline-dark btn-sm"
              >
                Close
              </button>
              <EditReminder
                theReminder={this.state.reminder}
                reloadHandler={this.reloadHandler}
              />
            </div>
          ) : (
            <div className="buttons-container">
              <button
                onClick={() => this.setState({ displayEditForm: true })}
                className="btn btn-primary btn-sm"
              >
                Edit Reminder
              </button>
              <button
                onClick={() => this.deleteReminder()}
                className="btn btn-danger btn-sm"
              >
                Delete reminder
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SingleReminder;
