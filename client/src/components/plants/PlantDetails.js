//view for all details of user's collection with two tabs:
//custom fields from user (component)
//api plant details (component) (hides if other component is open vice versa)
import React, { Component } from "react";
import PlantApiDetails from "./PlantApiDetails";
import PlantCustomFields from "./PlantCustomFields";
import axios from "axios";
import EditPlantDetails from "./EditPlantDetails";

export default class PlantDetails extends Component {
  state = {
    customComponent: true,
    apiComponent: false,
    apiPlant: null,
    userPlant: null,
    loading: true,
    displayEditForm: false,
  };

  // happens after first render
  componentDidMount() {
    this.getSinglePlant();
  }

  getSinglePlant = () => {
    const { params } = this.props.match;

    axios
      .get(`/api/my-plants/${params.id}/${params.slug}`)
      .then((responseFromApi) => {
        // console.log("RESPONSE", responseFromApi);

        this.setState({
          // apiPlant: { common_name: "Test" }, Use this to test if you don't have data
          apiPlant: responseFromApi.data.apiInfo.data,
          userPlant: responseFromApi.data.ourModel,
          loading: false,
        });
      });
  };

  reloadHandler = () => {
    this.setState({
      // loading: true,
      displayEditForm: false,
    });
    this.componentDidMount(); // reload data
  };

  showOrHide = () => {
    this.setState({
      customComponent: !this.state.customComponent,
      apiComponent: !this.state.apiComponent,
    });
  };
  render() {
    if (this.state.loading) {
      return <p> Loading ... </p>;
    }
    return (
      <div>
        {/* conditional rendering */}

        {this.state.userPlant && this.state.displayEditForm ? (
          <EditPlantDetails
            customPlantFields={this.state.userPlant}
            reloadHandler={this.reloadHandler}
          />
        ) : (
          <button onClick={() => this.setState({ displayEditForm: true })}>
            Edit Your Plant
          </button>
        )}

        <button onClick={this.showOrHide}>display other tab</button>

        {this.state.customComponent && (
          <PlantCustomFields dataFromUser={this.state.userPlant} />
        )}
        {this.state.apiComponent && (
          <PlantApiDetails dataFromApi={this.state.apiPlant} />
        )}
      </div>
    );
  }
}
