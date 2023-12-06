import React, { useState, useEffect } from 'react';
import './Running.css';
import NavigationBar from './pages/NavigationBar';
function Running() {
  const [goalHours, setGoalHours] = useState('00');
  const [goalMinutes, setGoalMinutes] = useState('00');
  const [goalDistanceValue, setGoalDistanceValue] = useState('0');
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleHoursChange = (event) => {
    const hours = event.target.value.replace(/\D/g, '').slice(0, 2); // Allow only numbers and limit to 2 digits
    setGoalHours(hours);
  };

  const handleMinutesChange = (event) => {
    const minutes = event.target.value.replace(/\D/g, '').slice(0, 2); // Allow only numbers and limit to 2 digits
    setGoalMinutes(minutes);
  };


  const handleGoalDistanceChange = (event) => {
    setGoalDistanceValue(event.target.value);
  };

  const handleStartClick = () => {
    setIsRunning(!isRunning); // Toggle running state on Start button click
    setIsPaused(false); // Reset pause state on start/resume
    setElapsedTime(0); // Reset elapsed time when starting
  };

  const handlePauseClick = () => {
    setIsPaused(!isPaused); // Toggle pause state on Pause button click
  };

  const handleDiscard = () => {
    // Handle discard here
    setIsRunning(false);
    setIsPaused(false);
    setIsFinished(false);
    setElapsedTime(0);
    setGoalHours('00');
    setGoalMinutes('00');
    setGoalDistanceValue('0');
  };

  const handleSave = () => {
    // Handle save here
    setIsRunning(false);
    setIsPaused(false);
    setIsFinished(false);
    setElapsedTime(0);
    setGoalHours('00');
    setGoalMinutes('00');
    setGoalDistanceValue('0');
  }
  const handleBackButtonClick = () => {
    if (isRunning) {
      setIsFinished(true);
    } else {
      // Redirect to the homepage
      window.location.href = '/';
    }
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    if (time < 0) {
      return `00:00:00 ✅`;
    }

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  const goalInSeconds = () => {
    const goalTime = (Number(goalHours) * 3600) + (Number(goalMinutes) * 60);
    return goalTime;
  };

  useEffect(() => {
    let timer;
    if (isRunning && !isPaused && !isFinished) {
      timer = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000); // Update elapsed time every second
    } else {
      clearInterval(timer); // Clear the interval when paused or not running
    }

    return () => clearInterval(timer); // Cleanup timer on component unmount or changes
  }, [isRunning, isPaused, isFinished]);

  return (
    <div className="cntainer">
      <div className="row left">
        <div className="title">Running</div>
        {isRunning && !isPaused && !isFinished && (
          <div className="subtitle">
            In Progress
          </div>
        )}
        {isPaused && !isFinished && (
          <div className="subtitle-paused">
            Paused
          </div>
        )}
        {isFinished && (
          <div className="subtitle-finished">
            Running Complete!
          </div>
        )}
        {!isRunning && (
          <>
            <div className="setgoal-title">Set Goal Time (HH:MM)</div>
            <div className="setgoal-input">
              <input
                type="text"
                placeholder="HH"
                maxLength="2"
                value={goalHours}
                onChange={handleHoursChange}
              />
              <span>:</span>
              <input
                type="text"
                placeholder="MM"
                maxLength="2"
                value={goalMinutes}
                onChange={handleMinutesChange}
              />
            </div>
          </>
        )}
        {isRunning && (
          <>
            <div className={`timer ${isPaused ? 'paused-color' : ''} ${isFinished ? 'finished-color' : ''}`}>{formatTime(elapsedTime)}</div>
            <div className="information">
              <div>Time left : {formatTime(goalInSeconds() - elapsedTime)}</div>
              <div>Distance left : {goalDistanceValue}Km</div>
              <div>Calories burnt : 0 Calories</div>
              <div>Steps : 0 Steps</div>
            </div>
          </>
        )}
        {!isRunning && (
          <>
            <div className="setdistance-title">Set Goal Distance (Km)</div>
            <div className="setdistance-input">
              <input
                type="text"
                placeholder="KM"
                value={goalDistanceValue}
                onChange={handleGoalDistanceChange}
              />
            </div>
          </>
        )}

      </div>
      <div className="row middle"></div>
      <div className="row right">
        {!isFinished && (
          <>
            <button
              id="leftBtn"
              className={`back-button ${isRunning ? 'stop-mode' : 'back-mode'}`}
              onClick={handleBackButtonClick}
            >
              {isRunning ? 'STOP' : 'BACK'}
            </button>
            <button
              className={`start-button ${isPaused ? 'resume-mode' : isRunning ? 'paused-mode' : 'start-mode'}`}
              onClick={isRunning ? handlePauseClick : handleStartClick}
            >
              {isPaused ? 'RESUME' : isRunning ? 'PAUSE' : 'START'}
            </button>
          </>)}
        {isFinished && (
          <>
            <button className='discard' onClick={handleDiscard}>🗑️</button>
            <button className='save' onClick={handleSave}>SAVE</button>
          </>)}
      </div>


    </div>
  );
}

export default Running;
