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
    numOfResults: 0,
    pageNum: 1,
    displayIcon: true
  };

  componentDidMount() {
    this.doSearch();
  }

  doSearch = () => {
    if (this.state.searchTerm.trim() === "") {
      this.setState({
        results: [],
        loading: false,
        numOfResults: 0,
        pageNum: 1,
        displayIcon: true
      });
      return;
    }

    axios
      .get("/api/search", { params: { searchterm: this.state.searchTerm, page: this.state.pageNum } })
      .then(resp => {
        this.setState({
          results: resp.data.data,
          loading: false,
          numOfResults: resp.data.meta.total,
          displayIcon: false
        });
      });
  };


  editSearchTerm = (event) => {
    const newSearchTerm = event.currentTarget.value;
    this.setState({ searchTerm: newSearchTerm, loading: true, pageNum: 1 }, () => {

      clearTimeout(this.state.timeoutID);
      const newTimeoutID = window.setTimeout(this.doSearch, 300);

      this.setState({ timeoutID: newTimeoutID });
    });
  }

  countPagesDown = () => {
    this.setState({ pageNum: this.state.pageNum - 1, loading: true }, () => {
      clearTimeout(this.state.timeoutID);
      this.doSearch();
    })
  }

  countPagesUp = () => {
    this.setState({ pageNum: this.state.pageNum + 1, loading: true }, () => {
      clearTimeout(this.state.timeoutID);
      this.doSearch();
    })
  }

  render() {
    // console.log(this.state.results);

    const totalResults = parseInt(this.state.numOfResults);
    const pageSize = 20; // number of results per page
    const numOfPages = Math.ceil(parseInt(this.state.numOfResults) / pageSize);

    return (
      <div className="list-main-container">
        <h2>Find Your Plants</h2>
        <div>
          <input type='text' value={this.state.searchTerm} onChange={this.editSearchTerm} className='form-control mb-4' placeholder='Search plant...'></input>
        </div>
        {/* Bootstrap spinner */}
        {this.state.loading && (<div className="spinner-border text-light d-block" role="status">
          <span className="sr-only">Loading...</span>
        </div>)}

        {this.state.displayIcon && (
          <div>
            <div className="api-info-box shadow p-4 mb-4 mt-3 bg-body rounded">Trefle API–initially used for this project–is no longer available. Plants data are now retrieved from an external demo API and you can search only limited number of plants, i.e. <strong>lavender</strong>, <strong>peony</strong>, <strong>lilac</strong>. <br />You can find out more <a href="https://plant-parenthood-demo-api.herokuapp.com/" className="yellow-link">here</a></div>
            <img src="/images/magnifying-glass.png" alt="small loupe" className="transparent-icon mt-3 mb-4" />
          </div>
          )}

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
            <div className="list-item shadow p-3 mb-4 bg-body rounded" key={plant.id}>
              <Link to={'/search/detail/' + plant.slug} >
                <div className="list-item-innerbox">
                  <div className="list-item-img-container"><img src={plant.image_url || "/images/growing.png"} alt="small plant" /></div>
                  <div className="list-item-names">
                    <h5 className="green-headline">{headline}</h5>
                    {otherNames.length > 0 && (<p className="list-item-paragraph">{otherNames.join(', ')}</p>)}
                  </div>
                  <div className="list-item-arrow">&#62;</div>
                </div>
              </Link>
            </div>
          );
        })}
        {totalResults ? (<h6 className="mb-4 pt-2">Results: {totalResults} | Pages: {numOfPages}</h6>) : ""}

        {this.state.results.length > 0 ? (
          <div className="pagination-container mb-4">
            <button onClick={this.countPagesDown} type="button" className="btn btn-primary btn-sm" disabled={this.state.pageNum === 1} >&#60;</button>
            <div className="mx-4"><h6>{this.state.pageNum}</h6></div>
            <button onClick={this.countPagesUp} type="button" className="btn btn-primary btn-sm" disabled={this.state.pageNum === numOfPages} >&#62;</button>
          </div>
        ) : ""}

      </div>
    );
  }
}

export default TrefleSearchResults;