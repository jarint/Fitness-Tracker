import React, { useState, useEffect } from 'react';
import './HydrationBar.css';
import NavigationBar from './NavigationBar';
import NutritionalInfo from '../NutritionalInfo';
import { calculateBreakdown } from './Utils.js';

const HydrationBar = ({ handleNutritionData }) => {
  const [goBack, setGoBack] = useState(false);
  const hydrationGoal = localStorage.getItem('hydrationGoal') || '0';
  const [showApp, setShowApp] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddRemoveVisible, setIsAddRemoveVisible] = useState(false);
  const hydrationOptions = ['Please Choose', 'Water', 'Lemonade', 'Gatorade', 'Coconut Water', 'Sports Drinks', 'Electrolyte Water', 'Energy Drinks', 'Protein Shakes'];

  const [hydrationItems, setHydrationItems] = useState(
    JSON.parse(localStorage.getItem('hydrationItems')) || [
      { name: 'Water', value: '' },
      { name: 'Energy Drinks', value: '' },
      { name: 'Protein Shakes', value: '' },
    ]
  );

  const [totalHydration, setTotalHydration] = useState(
    parseFloat(localStorage.getItem('totalHydration')) || 0);

  // Add this useEffect to handle the beforeunload event
  useEffect(() => {
    const handleUnload = () => {
      // Clear the user input in localStorage when the browser is closed
      localStorage.removeItem('hydrationItems');
      localStorage.removeItem('totalHydration');

      // Reset hydration data in the parent component
      handleNutritionData({
        calories: 0,
        fat: 0,
        protein: 0,
        sodium: 0,
        potassium: 0,
        cholesterol: 0,
        carbohydrate: 0,
        fiber: 0,
        sugar: 0,
      });
    };

    // Attach the event listener for browser unload
    window.addEventListener('beforeunload', handleUnload);

    // Cleanup: Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [handleNutritionData]);



  const calculateHydrationValues = () => {
    const hydrationValues = {
      Water: { calories: 0, fat: 0, protein: 0, sodium: 0, potassium: 0, cholesterol: 0, carbohydrate: 0, fiber: 0, sugar: 0 },
      Lemonade: { calories: 10, fat: 1, protein: 0, sodium: 5, potassium: 2, cholesterol: 0, carbohydrate: 5, fiber: 0, sugar: 4 },
      Gatorade: { calories: 20, fat: 0, protein: 0, sodium: 10, potassium: 20, cholesterol: 0, carbohydrate: 5, fiber: 0, sugar: 5 },
      // Add other hydration items as needed
    }
    return calculateBreakdown(hydrationItems, hydrationValues);
  };


  const handleBack = () => {
    setGoBack(true);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setIsAddRemoveVisible(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    setIsAddRemoveVisible(false);
    localStorage.setItem('hydrationItems', JSON.stringify(hydrationItems));
    localStorage.setItem('totalHydration', calculateTotalHydration());

    const totalHydration = calculateTotalHydration();
    handleNutritionData({
      hydration: totalHydration,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can add any additional logic needed for handling form submission
  };

  const handleHydrationChange = (e, index) => {
    const { value } = e.target;
    const newHydrationItems = [...hydrationItems];
    const totalHydration = calculateTotalHydration() - parseFloat(hydrationItems[index].value) + parseFloat(value);
    if (totalHydration > parseFloat(hydrationGoal)) {
      alert('Total hydration count exceeds the goal. Please adjust the values.');
      return;
    }
    newHydrationItems[index].value = value;
    setHydrationItems(newHydrationItems);
    setTotalHydration(totalHydration);
  };

  const handleNameChange = (e, index) => {
    const newHydrationItems = [...hydrationItems];
    newHydrationItems[index].name = e.target.value;
    setHydrationItems(newHydrationItems);
  };

  const handleAdd = () => {
    const newHydrationItems = [
      ...hydrationItems,
      { name: 'Please Choose', value: '' },
    ];
    setHydrationItems(newHydrationItems);
  };

  const handleRemove = (index) => {
    const newHydrationItems = [...hydrationItems];
    newHydrationItems.splice(index, 1);
    setHydrationItems(newHydrationItems);
  };

  const calculateTotalHydration = () => {
    let totalHydration = 0;
    if (hydrationItems) {
      hydrationItems.forEach((item) => {
        totalHydration += parseFloat(item.value) || 0;
      });
    }
    return totalHydration;
  };

  const handleCancel = () => {
    alert('You have canceled the goal setting.');
  };

  if (goBack) {
    return <NutritionalInfo />;
  }

  return (
    <div className="SetGoal">
      <button
        className="back-utton"
        style={{ position: 'absolute', top: 0, left: 10 }}
        onClick={handleBack}
      >
        BACK
      </button>
      <h1>Hydration Info</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="hydration-form">
            <h4>Hydration Breakdown:</h4>
            {hydrationItems.map((item, index) => (
              <div key={index} className="item-container">
                <label className="item-label">
                  <select
                    className="dropdown"
                    value={item.name}
                    onChange={(e) => handleNameChange(e, index)}
                    disabled={!isEditing}
                  >
                    {hydrationOptions.map((option, optionIndex) => (
                      <option key={optionIndex} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <input
                  className="item-input"
                  type="number"
                  placeholder="L"
                  value={item.value}
                  onChange={(e) => handleHydrationChange(e, index)}
                  disabled={!isEditing}
                />
              </div>
            ))}
            {isAddRemoveVisible && (
              <div className="button-container">
                <button className="add-button" type="button" onClick={handleAdd}>
                  Add Item
                </button>
                {hydrationItems.length > 0 && (
                  <button className="remove-button" type="button" onClick={handleRemove}>
                    Remove Item
                  </button>
                )}
              </div>
            )}
          </div>
        </form>
        <div className="total-hydration">Total hydration count: {calculateTotalHydration()} L</div>
        <div className="edit-section">
          {!isEditing ? (
            <button className="edit-button" onClick={handleEdit}>
              Edit✏️
            </button>
          ) : (
            <button className="save-button" onClick={handleSave}>
              Save💾
            </button>
          )}
        </div>
      </div>
      <div className="goal-section">
        <p>Goal for today: {hydrationGoal} L</p>
      </div>
      <NavigationBar />
    </div>
  );
};

export default HydrationBar;