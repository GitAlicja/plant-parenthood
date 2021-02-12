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
      <div className="list-main-container">
        <h2>All Reminders</h2>
        {/* Bootstrap spinner */}
        {this.state.loading && (<div className="spinner-border text-light" role="status">
          <span className="sr-only">Loading...</span>
        </div>)}

        { !this.state.loading && this.state.reminders.length === 0 ? (<div>
          <h4>No reminders yet!</h4>
          <img src="/images/calendar.png" alt="calender icon" className="transparent-icon mt-3 mb-4" />
        </div>) : this.state.reminders.map((reminder, key) => {

          let typeOfCareIcon = "";

          if (reminder.typeOfCare === "Water") {
            typeOfCareIcon = "/images/water-drop.png"
          } else if (reminder.typeOfCare === "Fertilize") {
            typeOfCareIcon = "/images/fertilizer.png"
          } else if (reminder.typeOfCare === "Repot") {
            typeOfCareIcon = "/images/plant-pot.png"
          } else if (reminder.typeOfCare === "Insecticide") {
            typeOfCareIcon = "/images/anti-flea.png"
          } else if (reminder.typeOfCare === "Trim") {
            typeOfCareIcon = "/images/scissors.png"
          }

          return (
            <div className="list-item shadow p-3 mb-4 bg-body rounded" key={reminder._id}>
              <Link to={'/reminders/' + reminder._id}>
                <div className="list-item-innerbox">
                  <div className="list-item-img-container"><img src={typeOfCareIcon} alt="reminder icon" /></div>
                  <div className="list-item-names">
                    <h5 className="list-item-headline">{reminder.plant.name}</h5>
                    <p className="list-item-paragraph">{reminder.typeOfCare}</p>
                    {/* date and time output format */}
                    <p className="list-item-date">on {new Date(reminder.reminderDate).toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
                    {/* <p>at {new Date(reminder.reminderDate).toLocaleTimeString("en-GB", { hour: "numeric", minute: "numeric" })}</p> */}
                  </div>
                  <div className="list-item-arrow">&#62;</div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ListOfReminders;