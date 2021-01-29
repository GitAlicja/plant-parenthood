import React from 'react';
import axios from 'axios';

class AddPlant extends React.Component {

  state = {
    name: "",
    plantImg: "",
    notes: ""
  };

  handleChangeInput = (event) => {
    this.setState({
      [event.target.name]: event.currentTarget.value
    })
  }

  submitHandler = (event) => {

    const slug = this.props.match.params.slug;

    event.preventDefault();

    axios.post("/api/my-plants", { ...this.state, slug })
      .then(resp => {
        this.props.history.push("/my-plants")
        // console.log(resp);
      })
  }

  render() {
    return (
      <div>
        <h2>Add a new plant</h2>
        <form>
          <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChangeInput} className="form-control input-field"></input>
          <textarea name="notes" placeholder="Description" value={this.state.notes} onChange={this.handleChangeInput} className="form-control input-field"></textarea>
          {/* <input type="file" name="plantImg"></input> */}
          <button onClick={this.submitHandler} className='btn btn-primary'>Save Plant</button>
        </form>
      </div>
    );
  }
}

export default AddPlant;