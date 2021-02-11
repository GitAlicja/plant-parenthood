import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";

const Home = () => {

  return (
    <div className="home-main-container shadow p-4 mb-4 mt-3 bg-body rounded">
        <div>
          <Link to="/search">
            <img src="/images/loupe.png" alt="small loupe" className="home-icons" />
            <h5 className="home-headline">Search Plants</h5>
          </Link>
        </div>
        <hr />
        <div>
          <Link to="/my-plants">
            <img src="/images/plant.png" alt="small plant" className="home-icons" />
            <h5 className="home-headline">Your Collection</h5>
          </Link>
        </div>
        <hr />
        <div>
          <Link to="/reminders">
            <img src="/images/calendar.png" alt="small calendar" className="home-icons" />
            <h5 className="home-headline">All Reminders</h5>
          </Link>
        </div>
      </div>
  );
}

export default Home;