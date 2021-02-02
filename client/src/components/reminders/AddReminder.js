import React from "react";
import axios from "axios";

class AddReminder extends React.Component {

  state = {
    // new Date() without any parameters preselects initial value for the local date and local time
    // dateToLocalString() function creates a string out of the date object and cuts seconds off
    reminderDate: this.dateToLocalString(new Date()),
    typeOfCare: "Water", // preselected value
    frequency: 1, // preselected value
    unit: "day", // preselected value
  };

  dateToLocalString(date) {
    const isoString = date.toISOString();
    return isoString.substr(0, isoString.lastIndexOf(":"));
  }

  handleChangeInput = (event) => {
    console.log(event)
    
    let value = event.currentTarget.value;
    // convert string to integer
    // frequency validation in the backend: validating type number
    // frequency sent in body as string
    if (event.currentTarget.name === 'frequency') {
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
    const reminderDate = new Date(this.state.reminderDate).toISOString()
    axios.post("/api/reminders", { ...this.state, reminderDate, plantID }).then((resp) => {
      this.props.history.push("/reminders");
      // console.log(resp);
    });
  };

  render() {
    return (
      <div>
        <h2>Add a reminder</h2>
        <form>
          <label>
            Date:
          <input type="datetime-local" name="reminderDate" value={this.state.reminderDate} onChange={this.handleChangeInput} />
          </label>

          <label>
            Remind me to:
          <select name="typeOfCare" value={this.state.typeOfCare} onChange={this.handleChangeInput} >
              <option value="Water">Water</option>
              <option value="Fertilize">Fertilize</option>
              <option value="Repot">Repot</option>
              <option value="Insecticide">Insecticide</option>
              <option value="Trim">Trim</option>
            </select>
          </label>

          <label>
            Every:
          <select name="frequency" value={this.state.frequency} onChange={this.handleChangeInput} >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>

            <select name="unit" value={this.state.unit} onChange={this.handleChangeInput}>
              <option value="day">day</option>
              <option value="week">week</option>
              <option value="month">month</option>
              <option value="year">year</option>
            </select>
          </label>

          <button onClick={this.submitHandler} className="btn btn-primary">
            Save Reminder
          </button>
        </form>
      </div>
    );
  }
}

export default AddReminder;
