import React from "react";
import axios from "axios";
import "../../App.css";

class AddReminder extends React.Component {
  state = {
    // new Date() without any parameters creates a new date object (local timezone)
    // dateToLocaleString() function creates a string (local timezone) without seconds
    reminderDate: this.dateToLocaleString(new Date()),
    typeOfCare: "Water", // preselected initial value
    frequency: 1, // preselected initial value (type: number)
    unit: "day", // preselected initial value
  };

  dateToLocaleString(date) {
    const padding = (v) => (v < 10 ? "0" + v : v);
    // expected HTML date and local time format 2021-02-03T17:16
    // getMonth() method returns the month in the specified date according to local time, where 0 = January
    return (
      date.getFullYear() +
      "-" +
      padding(date.getMonth() + 1) +
      "-" +
      padding(date.getDate()) +
      "T" +
      padding(date.getHours()) +
      ":" +
      padding(date.getMinutes())
    );
  }

  handleChangeInput = (event) => {
    console.log(event);

    let value = event.currentTarget.value;
    // convert string to integer
    // frequency validation in the backend: validating number (data type)
    // frequency sent in body as string
    if (event.currentTarget.name === "frequency") {
      value = parseInt(event.currentTarget.value);
    }

    // console.log(event, value)
    // this.setState({
    //   [event.target.name]: event.currentTarget.value,
    // });

    this.setState({
      [event.target.name]: value,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();

    // plant id passed through props
    const plantID = this.props.match.params.plantID;

    // send standardized ISO string via REST API
    const reminderDate = new Date(this.state.reminderDate).toJSON();
    axios
      .post("/api/reminders", { ...this.state, reminderDate, plantID })
      .then((resp) => {
        this.props.history.push("/reminders");
        // console.log(resp);
      });
  };

  render() {
    return (
      <div className="reminder-container">
        <h3>Add a reminder</h3>

        <form className="form-select">
          <div className="form-group form-row justify-content-center justify-content-md-start">
            <label className="col-sm-5 col-form-label">Date: </label>
            <div className="col-sm-4.5">
              <input
                type="datetime-local"
                name="reminderDate"
                value={this.state.reminderDate}
                onChange={this.handleChangeInput}
                className="mdb-select form-control"
              />
            </div>
          </div>
          <div className="form-group form-row justify-content-center justify-content-md-start">
            <label className="col-sm-5 col-form-label">Remind me to: </label>
            <div className="col-sm-4.5">
              <select
                name="typeOfCare"
                value={this.state.typeOfCare}
                onChange={this.handleChangeInput}
                className="mdb-select form-control"
              >
                <option value="Water">Water</option>
                <option value="Fertilize">Fertilize</option>
                <option value="Repot">Repot</option>
                <option value="Insecticide">Insecticide</option>
                <option value="Trim">Trim</option>
              </select>
            </div>
          </div>
          {/* <form className="form-inline"> */}
          <div className="form-group form-row justify-content-center justify-content-md-start">
            <label className="col-sm-5 col-form-label">Every:</label>
            <div className="col-sm-1.5">
              <select
                name="frequency"
                value={this.state.frequency}
                onChange={this.handleChangeInput}
                className="mdb-select form-control"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
              </select>
            </div>
            {/* <div className="form-group form-row"> */}
            <div className="col-sm-1.5">
              <select
                name="unit"
                value={this.state.unit}
                onChange={this.handleChangeInput}
                className="mdb-select form-control"
              >
                <option value="day">day</option>
                <option value="week">week</option>
                <option value="month">month</option>
                <option value="year">year</option>
              </select>
            </div>
          </div>

          {/* </form> */}
          <br></br>
          <button onClick={this.submitHandler} className="btn btn-primary">
            Save Reminder
          </button>
        </form>
      </div>
    );
  }
}

export default AddReminder;
