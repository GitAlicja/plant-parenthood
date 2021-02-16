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
    axios.get("/api/my-plants").then((resp) => {
      this.setState({
        plants: resp.data,
        loading: false,
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
      <div className="list-main-container">
        <h2>Your Plants Collection</h2>
        {/* Bootstrap spinner */}
        {this.state.loading && (
          <div className="spinner-border text-light" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
        {/* <input type='text' value={this.state.searchTerm} onChange={this.editSearchTerm} className='form-control input-field' placeholder='Search beers...'></input> */}

        { !this.state.loading && this.state.plants.length === 0 ? (<div>
          <h4>No plants yet!</h4>
          <img src="/images/plants.png" alt="plants collection icon" className="transparent-icon mt-3 mb-4" />
        </div>) : this.state.plants.map((plant, key) => {
          return (
            <div className="list-item shadow p-3 mb-4 bg-body rounded" key={plant._id}>
              <Link to={'/my-plants/detail/' + plant._id + "/" + plant.trefleSlug}>
                <div className="list-item-innerbox">
                  <div className="list-item-img-container"><img src={plant.plantImg || "/images/growing.png"} alt="small plant" /></div>
                  <div className="list-item-names">
                    <h5 className="green-headline">{plant.name}</h5>
                    <p className="list-item-paragraph">{plant.reminders.length} reminders</p>
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
}

export default PlantCollection;
