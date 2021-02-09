import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../../App.css";

class ListOfReminders extends React.Component {

  state = {
    reminders: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get('/api/reminders')
      .then(resp => {
        this.setState({
          // sort reminders by date
          reminders: resp.data.sort((a, b) => a.reminderDate < b.reminderDate ? -1 : 1),
          loading: false
        });
      });
  }

  render() {
    return (
      <div>
        <h2>All Reminders</h2>
        {/* Bootstrap spinner */}
        {this.state.loading && (<div className="spinner-border text-light" role="status">
          <span className="sr-only">Loading...</span>
        </div>)}

        { !this.state.loading && this.state.reminders.length === 0 ? (<p>No reminders yet!</p>) : this.state.reminders.map((reminder, key) => {
          return (
            <div className="list-result" key={reminder._id}>
              <Link to={'/reminders/' + reminder._id}>
                <h3>{reminder.plant.name}</h3>
                <p>{reminder.typeOfCare}</p>
                {/* date and time output format */}
                <p>on {new Date(reminder.reminderDate).toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
                {/* <p>at {new Date(reminder.reminderDate).toLocaleTimeString("en-GB", { hour: "numeric", minute: "numeric" })}</p> */}
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ListOfReminders;