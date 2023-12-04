import "./App.css";
import calendar from "./Calendar";

import { Link } from "react-router-dom";
import NavigationBar from "../src/pages/NavigationBar";

import NutritionalInfo from "./NutritionalInfo";
import { useState } from "react";

export default function Home() {
  const [goNutritionalInfo, setGoNutritionalInfo] = useState(false);
  const handleTracker = () => {
    setGoNutritionalInfo(true);
  };

  if (goNutritionalInfo) {
    return <NutritionalInfo />;
  }

  return (
    <div className="base">
      <div className="banner">
        <h2>Welcome!</h2>
      </div>
      {calendar()}

      <div className="info-panels">
        <div className="activities">
          <Link to="/Workouts">
            <div className="info" id="workouts">
              <button className="button">
                <h3> My Workouts </h3>
              </button>
            </div>
          </Link>
          <div className="info2" id="time-active">
            <button className="button" id="time-active">
              <h3> Time Active </h3>
            </button>
          </div>
        </div>

        <div className="activities">
          <div className="info" id="nutrition" onClick={handleTracker}>
            <button className="button">
              <h3> Nutrition </h3>
              <h3> Hydration </h3>
            </button>
          </div>
        </div>
      </div>

      <NavigationBar />
    </div>
  );
}
