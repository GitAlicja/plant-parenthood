import React from "react";
import { Link } from "react-router-dom";

const Home = () => {

  return (
    <div>
      <div>
        <div>
          <Link to="/search">Search Plants</Link>
        </div>
        <div>
          <Link to="/my-plants">Your Collection</Link>
        </div>
        <div>
          <Link to="/reminders">All Reminders</Link>
        </div>
      </div>
    </div>
  )
}

export default Home;