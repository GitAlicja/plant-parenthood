//view for all details of user's collection with two tabs:
//custom fields from user (component)
//api plant details (component) (hides if other component is open vice versa)
import React, { Component } from "react";

export default class PlantDetails extends Component {
  state = {
    customComponent: true,
    apiComponent: false,
  };
  showOrHide = () => {
    this.setState({
      customComponent: !this.state.customComponent,
      apiComponent: !this.state.apiComponent,
    });
  };
  render() {
    return (
      <div>
        {/* conditional rendering */}
        <button onClick={this.showOrHide}>display other tab</button>
        {this.state.customComponent ? <div>aaaaaa</div> : ""}
        {this.state.apiComponent ? <div>bbbbbbbbb</div> : ""}
      </div>
    );
  }
}
