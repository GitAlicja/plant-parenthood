//view for all details of user's collection with two tabs:
//custom fields from user (component)
//api plant details (component) (hides if other component is open vice versa)
import React, { Component } from "react";
import PlantApiDetails from "./PlantApiDetails";
import axios from "axios";

export default class PlantDetails extends Component {
  state = {
    customComponent: true,
    apiComponent: false,
  };

  componentDidMount() {
    const { params } = this.props.match;

    axios
      .get(`/api/my-plants/${params.id}/${params.slug}`)
      .then((responseFromApi) => {
        console.log("RESPONSE", responseFromApi);
        this.setState({
          //apiPlant: responseFromApi.data.apiInfo.data,
          apiPlant: { common_name: "Test" },
          loading: false,
        });
      });
  }

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
        {this.state.apiComponent ? (
          <PlantApiDetails dataFromApi={this.state.apiPlant} />
        ) : (
          ""
        )}
      </div>
    );
  }
}
