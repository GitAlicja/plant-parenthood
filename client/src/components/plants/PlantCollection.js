import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../../App.css";

class PlantCollection extends React.Component {

  state = {
    plants: [],
    loading: true,
    // searchTerm: "",
    // timeoutID: 0
  };

  componentDidMount() {
    axios
      .get('/api/my-plants')
      .then(resp => {
        this.setState({
          plants: resp.data,
          loading: false
        });
      });
  }

  // editSearchTerm = (event) => {
  //   const newSearchTerm = event.currentTarget.value;
  //   this.setState({ searchTerm: newSearchTerm, loading: true }, () => {

  //     clearTimeout(this.state.timeoutID);

  //     const newTimeoutID = window.setTimeout(() => axios
  //       .get('https://ih-beers-api2.herokuapp.com/beers/search', {
  //         params: { q: newSearchTerm }
  //       })
  //       .then(resp => {
  //         this.setState({
  //           beers: resp.data,
  //           loading: false
  //         });
  //       }), 300);

  //     this.setState({ timeoutID: newTimeoutID });
  //   });
  // }

  render() {
    return (
      <div>
        {/* <Navbar /> */}
        {/* Bootstrap spinner */}
        {this.state.loading && (<div className="spinner-border text-light" role="status">
          <span className="sr-only">Loading...</span>
        </div>)}

        {/* <input type='text' value={this.state.searchTerm} onChange={this.editSearchTerm} className='form-control input-field' placeholder='Search beers...'></input> */}

        {this.state.plants.map((plant, key) => {
          return (
            <div className="list-result" key={plant._id}>
              <Link to={'/my-plants/' + plant._id + "/" + plant.trefleSlug}>
                <div>
                  <img src={plant.plantImg} alt='small plant' />
                </div>
                <div>
                  <h3>{plant.name}</h3>
                  <p>{plant.reminders.length} reminders</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}

export default PlantCollection;