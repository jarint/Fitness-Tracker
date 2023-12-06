import React, { useState, useEffect } from 'react';
import './SetGoal.css';
import NutritionalInfo from '../NutritionalInfo';

const SetGoal = () => {
  const [goBack, setGoBack] = useState(false);
  const [showApp, setShowApp] = useState(false);
  const [nutritionGoal, setNutritionGoal] = useState('');
  const [hydrationGoal, setHydrationGoal] = useState('');

  const handleBack = () => {
    setGoBack(true);
  };

  useEffect(() => {
    // Check if we should go back to NutritionalInfo
    if (goBack) {
      setShowApp(true);
      // Don't proceed with the rest of the useEffect if going back
      return;
    }

    // Load data from localStorage when the component mounts
    const savedNutritionGoal = localStorage.getItem('nutritionGoal');
    const savedHydrationGoal = localStorage.getItem('hydrationGoal');

    if (savedNutritionGoal) {
      setNutritionGoal(savedNutritionGoal);
    }

    if (savedHydrationGoal) {
      setHydrationGoal(savedHydrationGoal);
    }

    // Attach the event listener for browser unload
    window.addEventListener('beforeunload', handleUnload);

    // Cleanup: Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [goBack]); // Include goBack in the dependencies array

  const handleUnload = () => {
    // Clear the goals in localStorage when the browser is closed
    localStorage.removeItem('nutritionGoal');
    localStorage.removeItem('hydrationGoal');
  };

  const handleNutritionChange = (e) => {
    setNutritionGoal(e.target.value);
  };

  const handleHydrationChange = (e) => {
    setHydrationGoal(e.target.value);
  };

  const handleCancel = () => {
    // Alert without saving and go back to NutritionalInfo
    alert('You have canceled the goal setting without saving changes.');
    setShowApp(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Alert with saving and go back to NutritionalInfo

    localStorage.setItem('nutritionGoal', nutritionGoal);
    localStorage.setItem('hydrationGoal', hydrationGoal);
    setShowApp(true);
  };

  if (showApp) {
    return <NutritionalInfo />;
  }

  return (
    <div className="SetGoal">
      <h1>Set Goal</h1>
      <button
        className="back-utton"
        style={{ position: 'absolute', top: 0, left: 10 }}
        onClick={handleBack}
      >
        BACK
      </button>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div>
            <h4>Nutrition Goal:</h4>
            <input
              type="number"
              placeholder="Calories"
              value={nutritionGoal}
              onChange={handleNutritionChange}
            />
          </div>
          <div>
            <h4>Hydration Goal:</h4>
            <input type="number" placeholder="L" value={hydrationGoal} onChange={handleHydrationChange} />
          </div>
          <div>
            <button className="cancel" type="button" onClick={handleCancel}>
              Cancel
            </button>
            <button className="submit" type="submit">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetGoal;
