import { Link, useLocation, useNavigate} from 'react-router-dom'
import { useState } from 'react';
import './App.css'
import calendar from './Calendar'

import {updateEvent, displayEvents} from './Calendar'

import NavigationBar from './pages/NavigationBar';

export default function Schedule() {
  let params = useLocation();
  let navigate = useNavigate();

  function HandleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    updateEvent(params.state, formJson, true);
  
    const routeChange = () =>{
      let path = `/`;
      navigate(path)
    }
    
    routeChange();
  }

  return (
    <div className="base">

      <div className="banner">
        <h2> Calendar</h2>
      </div>

      {calendar()}

      {displayEvents(params.state)}


      <div className='scheduleEvent'>
        <h2 id='scheduleTitle'> Add an Event</h2>
        <form className='scheduleExercise' onSubmit={HandleSubmit}>
          <label className='label'>
            Event Name
            <input type="text" name="eventName" className='formInput'></input>
          </label>

          {/* <label className='label'>Exercise Name
            <input type="text" name="exerciseName" className='formInput'></input>
          </label> */}

          <label className='label'>Time
            <div className='time'>
              <input type="time" name="startTime" className='formInput'></input>
              <p>To</p>
              <input type="time" name="endTime" className='formInput'></input>
            </div>
          </label>

          <div className='formButtons'>
            {/* <Link to="/"><button className='formButton' type='submit'>Save</button></Link> */}
              <br></br>
            <button className='formButton' id='submit' type='submit'>Save</button>

            <Link to="/"><button className='formButton' id='cancel'>Cancel</button></Link>
          </div>
        </form>



      </div>


    </div>

  );

}