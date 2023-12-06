import React, { useState, useEffect } from 'react';
import './NutritionalInfo.css';
import SetGoal from './pages/SetGoal';
import HydrationBar from './pages/HydrationBar';
import NutritionPie from './pages/NutritionPie';
import Home from './Homepage';

function NutritionalInfo() {
  const [goBack, setGoBack] = useState(false);
  const totalHydration = parseInt(localStorage.getItem('totalHydration')) || 0;
  const hydrationGoal = parseInt(localStorage.getItem('hydrationGoal')) || 0;
  const hydrationPercentage = `${Math.round((totalHydration / hydrationGoal) * 100)}%`;
  localStorage.setItem('hydrationPercentage', hydrationPercentage);

  const totalNutrition = parseInt(localStorage.getItem('totalNutrition')) || 0;
  const nutritionGoal = parseInt(localStorage.getItem('nutritionGoal')) || 0;

  const data = {
    datasets: [
      {
        data: [totalNutrition, nutritionGoal],
        backgroundColor: ["#10739e", "transparent"],
      },
    ],
  };

  document.documentElement.style.setProperty('--hydration-percentage', hydrationPercentage);

  const [hydrationBar, setHydrationBar] = useState(false);
  const [showGoal, setShowGoal] = useState(false);
  const [nutritionPie, setNutritionPie] = useState(false);
  const currentDate = new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [calorieBreakdown, setCalorieBreakdown] = useState(
    JSON.parse(localStorage.getItem('nutritionData')) || {
      carbohydrate: 0,
      protein: 0,
      fats: 0,
      vitamins: 0,
      minerals: 0,
    }
  );

  const handleNutritionData = (data) => {
    setCalorieBreakdown({
      carbohydrate: data.carbs,
      protein: data.protein,
      fats: data.fats,
      vitamins: data.vitamins,
      minerals: data.minerals,
    });
    localStorage.setItem('nutritionData', JSON.stringify(data));
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleDateClick = () => {
    setShowDatePicker(true);
  };

  const handleSetGoalClick = () => {
    setShowGoal(true);
  };

  if (showGoal) {
    return <SetGoal />
  }

  const handleBack = () => {
    setGoBack(true);
  };
  if (goBack) {
    return <Home />
  }
  const handleHydrationBarClick = () => {
    setHydrationBar(true);
  };

  if (hydrationBar) {
    return <HydrationBar handleNutritionData={handleNutritionData} />;
  }

  const handleNutritionPieClick = () => {
    setNutritionPie(true);
  };

  if (nutritionPie) {
    return <NutritionPie handleNutritionData={handleNutritionData} />;
  }

  const nutritionPercentage = `${Math.round((calorieBreakdown.calories / nutritionGoal) * 100)}%`;
  localStorage.setItem('nutritionPercentage', nutritionPercentage);
  document.documentElement.style.setProperty('--nutrition-percentage', nutritionPercentage);

  return (
    <div className="NutritionalInfo">
      <header className="NutritionalInfo-header">
        <h1>Nutrition Info</h1>
        <button
          className="back-utton"
          style={{ position: 'absolute', top: 0, left: 10 }}
          onClick={handleBack}
        >
          BACK
        </button>

        <div>
          {showDatePicker ? (
            <input type="date" value={selectedDate} onChange={handleDateChange} />
          ) : (
            <button className="button" onClick={handleDateClick}>
              {selectedDate}
            </button>
          )}
        </div>

        <div className="info-container">
          <div className="set-hydration-bar" onClick={handleHydrationBarClick}>
            <div className="hydration-progress">
              <div
                className="progress-bar"
                style={{ height: `${hydrationPercentage}` }}
              ></div>
            </div>
            <div className="hydration-label">Hydration<br />
              {hydrationPercentage}</div>
          </div>
          <div className="nutrition-pie" onClick={handleNutritionPieClick}>
            <div className="hydration-progress">
              <div
                className="progress-nutrition"
                style={{ height: `${nutritionPercentage}` }}
              ></div>
            </div>
            <div className="hydration-label">Nutrition <br />
              {nutritionPercentage} </div>
          </div>
        </div>

        <div className="whitepart">
          <div className="calorie-breakdown">
            <br />
            <h3 >Breakdown:</h3>
            <br />
            <h5><p>Calories: {calorieBreakdown.calories ? calorieBreakdown.calories.toFixed(1) : 0} calories</p></h5>
            <h6>
              {calorieBreakdown && (
                <>
                  <p>Carbohydrate: {calorieBreakdown.carbohydrate ? calorieBreakdown.carbohydrate.toFixed(1) : 0} g</p>
                  <p>Fat: {calorieBreakdown.fats ? calorieBreakdown.fats.toFixed(1) : 0} g</p>
                  <p>Protein: {calorieBreakdown.protein ? calorieBreakdown.protein.toFixed(1) : 0} g</p>
                  <p>Sodium: {calorieBreakdown.sodium ? calorieBreakdown.sodium.toFixed(1) : 0} mg</p>
                  <p>Potassium: {calorieBreakdown.potassium ? calorieBreakdown.potassium.toFixed(1) : 0} mg</p>
                  <p>Cholesterol: {calorieBreakdown.cholesterol ? calorieBreakdown.cholesterol.toFixed(1) : 0} mg</p>
                  <p>Fiber: {calorieBreakdown.fiber ? calorieBreakdown.fiber.toFixed(1) : 0} g</p>
                  <p>Sugar: {calorieBreakdown.sugar ? calorieBreakdown.sugar.toFixed(1) : 0} g</p>
                </>
              )}
            </h6>
          </div>
        </div>

        <button className="set-goal-button" onClick={handleSetGoalClick}>
          Set Goal
        </button>
      </header>
    </div>
  );
}

export default NutritionalInfo;
