import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";

const Home = () => {

  return (
    <div>
      <div>
        <div>
          <Link to="/search">
            <img src="/images/loupe.png" alt="small loupe" className="home-icons" />
            <h3>Search Plants</h3>
          </Link>
        </div>
        <div>
          <Link to="/my-plants">
            <img src="/images/plant.png" alt="small plant" className="home-icons" />
            <h3>Your Collection</h3>
          </Link>
        </div>
        <div>
          <Link to="/reminders">
            <img src="/images/calendar.png" alt="small calendar" className="home-icons" />
            <h3>All Reminders</h3>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home;