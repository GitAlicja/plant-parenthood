import React from "react";
import axios from "axios";

class EditUserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: this.props.theUser.username,
      email: this.props.theUser.email,
      profileImg: ""
    }
  };

  handleChangeInput = (event) => {
    this.setState({
      [event.target.name]: event.currentTarget.value,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();

    axios.put("/api/user-profile", { ...this.state }).then((resp) => {
      this.props.reloadHandler();
    });
  };

  uploadHandler = (event) => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", event.target.files[0]);

    axios.post("/api/upload", uploadData).then((resp) => {
      this.setState({
        profileImg: resp.data.secure_url
      });
    });
  };

  render() {
    return (
      <div>
        <h3>Edit Profile</h3>
        <form>
          <label>
            Username:
          <input type="text" name="username" value={this.state.username} onChange={this.handleChangeInput} />
          </label>
          <label>
            Email:
          <input type="text" name="email" value={this.state.email} onChange={this.handleChangeInput} />
          </label>
          <label>
            Profile Image:
          <input type="file" name="profileImg" onChange={this.uploadHandler} />
          </label>
          <br /><br />
          <button onClick={this.submitHandler} className="btn btn-primary">
            Save Changes
          </button>
        </form>
      </div>
    );
  }

}

export default EditUserProfile;