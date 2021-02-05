import React from "react";
import { Link } from "react-router-dom";

import "../../App.css";

const PlantListOfReminders = (props) => {
  // list of plant reminders (saved in reminders array)
  // props.plantReminders

  return (
    <div>
      <h4>Reminders</h4>
      { !props.plantReminders.length === 0 ? (<p>No reminders yet!</p>) : props.plantReminders.map((reminder, key) => {
        return (
          <div className="list-result" key={reminder._id}>
            <Link to={'/reminders/' + reminder._id}>
              <p>{reminder.typeOfCare}</p>
              {/* date and time output format */}
              <p>{new Date(reminder.reminderDate).toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
              <p>{new Date(reminder.reminderDate).toLocaleTimeString("en-GB", { hour: "numeric", minute: "numeric" })}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default PlantListOfReminders;