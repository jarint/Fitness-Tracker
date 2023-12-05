import React, { useState, useEffect } from 'react';
import './NutritionPie.css';
import NavigationBar from './NavigationBar';
import NutritionalInfo from '../NutritionalInfo';
import { calculateBreakdown } from './Utils.js';


const NutritionPie = ({ handleNutritionData }) => {
  const [goBack, setGoBack] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddRemoveVisible, setIsAddRemoveVisible] = useState(false);
  const nutritionGoal = localStorage.getItem('nutritionGoal') || '0';
  const nutritionOptions = ['Please Choose', 'Rice', 'Chicken', 'Peas'];

  const [nutritionItems, setNutritionItems] = useState(
    JSON.parse(localStorage.getItem('nutritionItems')) || [
      { name: 'Rice', value: '' },
      { name: 'Chicken', value: '' },
      { name: 'Peas', value: '' },
    ]
  );

  const [totalNutrition, setTotalNutrition] = useState(
    parseFloat(localStorage.getItem('totalNutrition')) || 0
  );

  useEffect(() => {
    // Load data from localStorage when the component mounts
    const savedNutritionItems = JSON.parse(localStorage.getItem('nutritionItems')) || [];
    const savedTotalNutrition = parseFloat(localStorage.getItem('totalNutrition')) || 0;

    if (savedNutritionItems.length > 0) {
      setNutritionItems(savedNutritionItems);
    }

    setTotalNutrition(savedTotalNutrition);

    // Attach the event listener for browser unload
    window.addEventListener('beforeunload', handleUnload);

    // Cleanup: Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const handleUnload = () => {
    // Clear the user input in localStorage when the browser is closed
    localStorage.removeItem('nutritionItems');
    localStorage.removeItem('totalNutrition');

    handleNutritionData({
      calories: 0,
      fats: 0,
      protein: 0,
      sodium: 0,
      potassium: 0,
      cholesterol: 0,
      carbohydrate: 0,
      fiber: 0,
      sugar: 0,
    });
  };

  const calculateNutritionValues = () => {
    const nutritionValues = {
      Rice: { calories: 1.274, fats: 0.003, protein: 0.027, sodium: 0.01, potassium: 0.42, cholesterol: 0, carbohydrate: 0.284, fiber: 1 / 250, sugar: 1 / 1000 },
      Chicken: { calories: 2.2, fats: 0.12, protein: 0.23, sodium: 0.72, potassium: 1.79, cholesterol: 0.92, carbohydrate: 0, fiber: 0, sugar: 0 },
      Peas: { calories: 0.824, fats: 1 / 500, protein: 0.054, sodium: 3 / 100, potassium: 117 / 100, cholesterol: 0, carbohydrate: 0.159, fiber: 27 / 500, sugar: 59 / 1000 },
      // Add other items as needed
    };

    return calculateBreakdown(nutritionItems, nutritionValues);
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
    localStorage.setItem('nutritionItems', JSON.stringify(nutritionItems));
    localStorage.setItem('totalNutrition', calculateTotalNutrition());

    const nutritionData = calculateNutritionValues();
    handleNutritionData(nutritionData); // Pass the nutrition data to the parent component
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleNutritionChange = (e, index) => {
    const { value } = e.target;
    const newNutritionItems = [...nutritionItems];
    const totalNutrition = calculateTotalNutrition() - parseFloat(nutritionItems[index].value) + parseFloat(value);
    if (totalNutrition > parseFloat(nutritionGoal)) {
      alert('Total nutrition count exceeds the goal. Please adjust the values.');
      return;
    }
    newNutritionItems[index].value = value;
    setNutritionItems(newNutritionItems);
    setTotalNutrition(totalNutrition);
  };

  const handleNameChange = (e, index) => {
    const newNutritionItems = [...nutritionItems];
    newNutritionItems[index].name = e.target.value;
    setNutritionItems(newNutritionItems);
  };

  const handleAdd = () => {
    const newNutritionItems = [
      ...nutritionItems,
      { name: 'Water', value: '' },
    ];
    setNutritionItems(newNutritionItems);
  };

  const handleRemove = (index) => {
    const newNutritionItems = [...nutritionItems];
    newNutritionItems.splice(index, 1);
    setNutritionItems(newNutritionItems);
  };

  const calculateTotalNutrition = () => {
    let totalNutrition = 0;
    nutritionItems.forEach((item) => {
      totalNutrition += parseFloat(item.value) || 0;
    });
    return totalNutrition;
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
      <h1>Nutrition Info</h1>
      <div className="container">

        <form onSubmit={handleSubmit}>
          <div className="nutrition-form">
            <h4>Nutrition Breakdown:</h4>
            {nutritionItems.map((item, index) => (
              <div key={index} className="item-container">
                <label className="item-label">
                  <select
                    className="dropdown"
                    value={item.name}
                    onChange={(e) => handleNameChange(e, index)}
                    disabled={!isEditing}
                  >
                    {nutritionOptions.map((option, optionIndex) => (
                      <option key={optionIndex} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <input
                  className="item-input"
                  type="number"
                  placeholder="gm/pc"
                  value={item.value}
                  onChange={(e) => handleNutritionChange(e, index)}
                  disabled={!isEditing}
                />
              </div>
            ))}
            {isAddRemoveVisible && (
              <div className="button-container">
                <button className="add-button" type="button" onClick={handleAdd}>
                  Add Item
                </button>
                {nutritionItems.length > 0 && (
                  <button className="remove-button" type="button" onClick={handleRemove}>
                    Remove Item
                  </button>
                )}
              </div>
            )}
          </div>
        </form>
        <div className="total-nutrition">Total calories: {calculateNutritionValues().calories.toFixed(2)} calories</div>

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
        <p>Goal for today: {nutritionGoal} calories</p>
      </div>
      <NavigationBar />
    </div>
  );
};

export default NutritionPie;

