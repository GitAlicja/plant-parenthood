import React from "react";
import { Link } from "react-router-dom";
// import Navbar from "./Navbar";
// import Footer from "./Footer";

const Home = () => {

  return (
    <div>
      {/* <Navbar /> */}
      <div>
        <div>
          <Link to="/search"></Link>
          <h2>Search Plants</h2>
        </div>
        <div>
          <Link to="/my-plants"></Link>
          <h2>Your Collection</h2>
        </div>
        <div>
          <Link to="/reminders"></Link>
          <h2>Check Reminders</h2>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default Home;