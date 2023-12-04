import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const HomePage = () => {
  const userName = 'John Doe'; // Replace with the actual username
  const currentDate = new Date().toISOString().slice(0, 10);

  const events = [
    {
      start: new Date(),
      end: new Date(moment().add(1, 'days')),
      title: 'Workout 1',
    },
    {
      start: new Date(moment().add(2, 'days')),
      end: new Date(moment().add(3, 'days')),
      title: 'Workout 2',
    },
    // Add more events as needed
  ];


  return (
    <div className="homepage-container">
      <div className="current-date-container">
        <p>Today's Date: {currentDate}</p>
      </div>
      <div className="account-title">{`${userName}'s Account`}</div>
      <div className="calendar-container">
        <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" style={{ height: 500 }} />
      </div>
      <div className="workout-list-container">
        {/* Implement the workout list component */}
        <div className="workout-list">
          {/* Add your workout list here */}
        </div>
      </div>
      <div className="panel-container">
        <div className="activity-tracker-panel">
          {/* Implement the activity tracker panel */}
          <div className="activity-tracker">
            <button>Times Active</button>
          </div>
        </div>
        <div className="nutrition-tracker-button">
          <button>Nutrition/Hydration Tracker</button>
        </div>
        <div className="nutrition-tracker-panel">
          {/* Implement the nutrition tracker panel */}
          <div className="nutrition-tracker">
            {/* Add your nutrition tracker here */}
          </div>
        </div>
      </div>
    </div>
  )
};

export default HomePage;
