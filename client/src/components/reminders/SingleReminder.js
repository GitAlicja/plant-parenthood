import React from 'react';
import axios from 'axios';

export class SingleReminder extends React.Component {

  state = {
    reminder: null,
    loading: true
  };

  componentDidMount() {
    // id like in the App.js Route path='/reminders/:id'
    const reminderId = this.props.match.params.id;

    axios
      .get("/api/reminders/" + reminderId)
      .then(resp => {
        this.setState({
          reminder: resp.data,
          loading: false
        });
      });
  }

  // first render action happens with value null for the beer property (initial state value)
  // you will need if else statement or setTimeout inside setState (inside promise)
  render() {
    return (
      <div>
        {/* <Navbar /> */}
        {/* Bootstrap spinner */}
        {this.state.loading && (<div className="spinner-border text-light" role="status">
          <span className="sr-only">Loading...</span>
        </div>)}

        {/* first data has to be there (loaded) */}
        {/* if data is not there you would try to show for example this.state.reminder.null instead of this.state.reminder.reminderDate and example this.state.reminder.null will always cause errors */}
        {this.state.reminder && (
          <div>
            <h2>{this.state.reminder.plant.name}</h2>
            <p>{new Date(this.state.reminder.reminderDate).toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
            <p>{new Date(this.state.reminder.reminderDate).toLocaleTimeString("en-GB", { hour: "numeric", minute: "numeric" })}</p>
            <p>{this.state.reminder.typeOfCare}</p>
            <p>{this.state.reminder.frequency} {this.state.reminder.unit}</p>
          </div>
        )}
      </div>
    );
  }
}

export default SingleReminder;