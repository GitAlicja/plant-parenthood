import React from "react";
import { Link } from "react-router-dom";

import "../../App.css";

const PlantListOfReminders = (props) => {
  // list of plant reminders (saved in reminders array)
  // props.plantReminders

  return (
    <div className="details-list-main-container mb-2">
      <h4>Remind me to...</h4>
      { props.plantReminders.length === 0 ? (<div>
        <h5>No reminders yet!</h5>
        <img src="/images/calendar.png" alt="small calendar" className="transparent-icon mt-3 mb-4" />
      </div>) : props.plantReminders.map((reminder, key) => {

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
                <div className="list-item-img-container"><img src={typeOfCareIcon} alt="type of care" /></div>
                <div className="list-item-names">
                  <h5 className="green-headline">{reminder.typeOfCare}</h5>
                  {/* date and time output format */}
                  <p className="list-item-date">on {new Date(reminder.reminderDate).toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
                  {/* <p>at {new Date(reminder.reminderDate).toLocaleTimeString("en-GB", { hour: "numeric", minute: "numeric" })}</p> */}
                  <p className="list-item-paragraph">Set for every {reminder.frequency} {reminder.unit}</p>
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

export default PlantListOfReminders;