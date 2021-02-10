import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../../App.css";


class TrefleSearchResults extends React.Component {

  state = {
    results: [],
    loading: true,
    searchTerm: "",
    timeoutID: 0,
    numOfResults: ""
  };

  componentDidMount() {
    this.doSearch();
  }

  doSearch = () => {
    if (this.state.searchTerm.trim() === "") {
      this.setState({
        results: [],
        loading: false,
        numOfResults: ""
      });
      return;
    }

    axios
      .get("/api/search", { params: { searchterm: this.state.searchTerm } })
      .then(resp => {
        this.setState({
          results: resp.data.data,
          loading: false,
          numOfResults: resp.data.meta.total
        });
      });
  };


  editSearchTerm = (event) => {
    const newSearchTerm = event.currentTarget.value;
    this.setState({ searchTerm: newSearchTerm, loading: true }, () => {

      clearTimeout(this.state.timeoutID);
      const newTimeoutID = window.setTimeout(this.doSearch, 300);

      this.setState({ timeoutID: newTimeoutID });
    });
  }

  render() {
    console.log(this.state.results)
    return (
      <div className="list-main-container">
        <h2>Find Your Plants</h2>
        {/* Bootstrap spinner */}
        {this.state.loading && (<div className="spinner-border text-light" role="status">
          <span className="sr-only">Loading...</span>
        </div>)}
        <div>
          <input type='text' value={this.state.searchTerm} onChange={this.editSearchTerm} className='form-control' placeholder='Search plant...'></input>
        </div>
        {this.state.results.map((plant, key) => {

          const headline = plant.common_name || plant.scientific_name;
          const otherNames = [];
          if (plant.common_name) {
            otherNames.push(plant.scientific_name);
            if (plant.synonyms.length > 0) {
              otherNames.push(plant.synonyms[0]);
            }
          } else if (plant.synonyms.length > 0) {
            otherNames.push(plant.synonyms[0]);
            if (plant.synonyms.length > 1) {
              otherNames.push(plant.synonyms[1]);
            }
          }

          return (
            <div className="list-item" key={plant.id}>
              <Link to={'/search/detail/' + plant.slug} >
                <h3>{headline}</h3>
                {otherNames.length > 0 && (<p>Other names: {otherNames.join(', ')}</p>)}
              </Link>
            </div>
          );
        })}
        <p>{this.state.numOfResults}</p>
      </div>
    );
  }
}

export default TrefleSearchResults;