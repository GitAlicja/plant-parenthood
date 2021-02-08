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
      <div>
        {/* Bootstrap spinner */}
        {/* {this.state.loading && (<div className="spinner-border text-light" role="status">
                  <span className="sr-only">Loading...</span>
              </div>)} */}

        <input type='text' value={this.state.searchTerm} onChange={this.editSearchTerm} className='form-control input-field' placeholder='Search plant...'></input>

        {this.state.results.map((plant, key) => {
          return (
            <div className="list-result" key={plant.id}>
              <Link to={'/search/detail/' + plant.slug} >
                {plant.common_name ? (<h3>{plant.common_name}</h3>) : (<h3>Scientific name</h3>)}
                <p>{plant.scientific_name}</p>
              </Link>
              </div>
          );
        })}
        <p>{ this.state.numOfResults }</p>
      </div>
    );
  }
}

export default TrefleSearchResults;