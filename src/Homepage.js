import "./App.css";
import calendar from "./Calendar";

import { Link } from "react-router-dom";
import NavigationBar from "../src/pages/NavigationBar";
import Workouts from "./pages/Workouts";
import NutritionalInfo from "./NutritionalInfo";
import { useState } from "react";
import Running from "./Running";


export default function Home() {
  const [showTimeActive, setShowTimeActive] = useState(false);
  const [goNutritionalInfo, setGoNutritionalInfo] = useState(false);


  const hydrationPercentage = parseInt(localStorage.getItem('hydrationPercentage')) + "%" || "Not set yet";


  const nutritionPercentage = parseInt(localStorage.getItem('nutritionPercentage')) + "%" || "Not set yet";




  const handleTimeActiveClick = () => {
    setShowTimeActive(true);
  }
  if (showTimeActive) {
    return <Running />
  }

  const handleTracker = () => {
    setGoNutritionalInfo(true);
  }

  if (goNutritionalInfo) {
    return <NutritionalInfo />
  }


  return (
    <div className="base">
      <div className="banner">
        <h2>Welcome to FitTrack!</h2>
      </div>
      <br></br>
       <p className="instructions">
        Select a day of the week below to schedule an exercise
      </p>
      {calendar()}
      
      <p className="instructions">
        Select a category below to set and track your fitness goals
      </p>
     
      <div className="info-panels">
        <div className="activities">
          <Link to="/Workouts">
            <div className="info" id="workouts">

              <h3> My Workouts </h3>
              <div className='workoutList'>
                Chest Press
              </div>

              <div className='workoutList'>
                Leg Press
              </div>
              <div className='workoutList'>
                Calf Raises
              </div>
              <div className='workoutList'>
                Lateral Raises
              </div>


            </div>
          </Link>

          <div className="info2" id="time-active" onClick={handleTimeActiveClick}>

            <h3> Time Active </h3>
            <br />
            <div className='tik'>
              <div className='t'>00:00:00</div>
            </div>


          </div>

        </div>

        <div className="activities">
          <div className="info" id="nutrition" onClick={handleTracker}>
            <h3>Nutrition Goals: </h3>
            <br />
            <h5>Hydration:</h5> <b>{hydrationPercentage}</b> of goal reached
            <br />
            <br />
            <h5>Nutrition:  </h5><b> {nutritionPercentage}</b> of goal reached



          </div>
        </div>
      </div>


    </div>
  );
}
