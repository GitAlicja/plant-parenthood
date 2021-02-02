import React from "react";
import axios from "axios";

class EditReminder extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // this.props.theReminder.reminderDate is a string from the data bank
      reminderDate: this.dateToLocalString(this.props.theReminder.reminderDate),
      typeOfCare: this.props.theReminder.typeOfCare,
      frequency: this.props.theReminder.frequency,
      unit: this.props.theReminder.unit
    }
  }

  dateToLocalString(isoString) {
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

    const reminderId = this.props.theReminder._id;

    // send standardized ISO string via REST API
    const reminderDate = new Date(this.state.reminderDate + "Z").toISOString()

    // needs to match the backend route (reminder-routes)
    axios.put("/api/reminders/" + reminderId, { ...this.state, reminderDate }).then((resp) => {
      this.props.reloadHandler();
      // console.log(resp);
    });
  };

  render() {
    return (
      <div>
        <h4>Edit reminder</h4>
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

export default EditReminder;
