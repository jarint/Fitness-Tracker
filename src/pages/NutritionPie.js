import React, { useState, useEffect } from 'react';
import './NutritionPie.css';
import NavigationBar from './NavigationBar';
import NutritionalInfo from '../NutritionalInfo';
import { calculateBreakdown } from './Utils.js';
import Home from '../Homepage';


const NutritionPie = ({ handleNutritionData }) => {
  const [goHome, setGoHome] = useState(false);
  const [goBack, setGoBack] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddRemoveVisible, setIsAddRemoveVisible] = useState(false);
  const nutritionGoal = localStorage.getItem('nutritionGoal') || '0';
  const nutritionOptions = ['Please Choose', 'Rice', 'Chicken', 'Peas', 'Almonds', 'Milk', 'Broccoli', 'Bananas', 'Salmon', 'Yogurt', 'Eggs', 'Quinoa', 'Potatoes'];

  const [nutritionItems, setNutritionItems] = useState(
    JSON.parse(localStorage.getItem('nutritionItems')) || [
      { name: 'Rice', value: '' },
      { name: 'Chicken', value: '' },
      { name: 'Eggs', value: '' },
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
      Eggs: { calories: 73.5, fats: 4.8, protein: 6.3, sodium: 69, potassium: 99, cholesterol: 185, carbohydrate: 0.4, fiber: 0, sugar: 0.2 },
      Almonds: { calories: 6.037, fats: 0.527, protein: 0.21, sodium: 4.9, potassium: 4.66, cholesterol: 0, carbohydrate: 0.213, fiber: 0.111, sugar: 0.046 },
      Broccoli: { calories: 0.35, fats: 1 / 250, protein: 3 / 125, sodium: 0.41, potassium: 13 / 20, cholesterol: 0, carbohydrate: 0.073, fiber: 3.3 / 100, sugar: 1.4 / 100 },
      Bananas: { calories: 105.5, fats: 0.4, protein: 1.3, sodium: 1, potassium: 26, cholesterol: 0, carbohydrate: 27.4, fiber: 3, sugar: 14.5 },
      Salmon: { calories: 2.087, fats: 0.121, protein: 0.22, sodium: 0.61, potassium: 2.53, cholesterol: 0.63, carbohydrate: 0, fiber: 0, sugar: 0 },
      Yogurt: { calories: 0.607, fats: 1 / 250, protein: 10.2 / 100, sodium: 36 / 100, potassium: 133 / 100, cholesterol: 5 / 100, carbohydrate: 3.6 / 100, fiber: 0, sugar: 3.2 / 100 },
      Quinoa: { calories: 121.8 / 100, fats: 1.9 / 100, protein: 4.4 / 100, sodium: 6 / 100, potassium: 152 / 100, cholesterol: 0, carbohydrate: 21 / 100, fiber: 2.8 / 100, sugar: 0.9 / 100 },
      Potatoes: { calories: 75.9 / 100, fats: 0.1 / 100, protein: 1.4 / 100, sodium: 27 / 100, potassium: 32 / 100, cholesterol: 0, carbohydrate: 17.6 / 100, fiber: 2.5 / 100, sugar: 5.8 / 100 },
      Milk: { calories: 51.3 / 100, fats: 1.9 / 100, protein: 3.5 / 100, sodium: 52 / 100, potassium: 1, cholesterol: 8 / 100, carbohydrate: 4.9 / 100, fiber: 0, sugar: 0 }


      // Add other items as needed
    };

    return calculateBreakdown(nutritionItems, nutritionValues);
  };

  const handleBack = () => {
    setGoBack(true);
  };

  const handleGoHome = () => {
    setGoHome(true);
  }
  if (goHome) {
    return <Home />;
  }

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
            <br />
            <h3>Nutrition Breakdown:</h3>
            <br />
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
      <button className="nav" onClick={handleGoHome}>
        Home
      </button>
    </div>
  );
};

export default NutritionPie;

