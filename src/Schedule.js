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
  
    if (formJson.eventName === null || formJson.eventName === ""){
      return(
        alert("Event name is missing")
      )
    }
    if( formJson.startTime >formJson.endTime){
      return(
        alert("Invalid start time or end time")
      )
    }
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
      <p className='instructions'>
        To refresh the page, select a day of the week
      </p>
      {displayEvents(params.state)}


      <div className='scheduleEvent'>
        <h2 id='scheduleTitle'> Add an Event</h2>
        <form className='scheduleExercise' onSubmit={HandleSubmit}>
          <label className='label'>
            <h3>Event Name</h3>
            <input type="text" name="eventName" className='formInput'></input>
          </label>

          {/* <label className='label'>Exercise Name
            <input type="text" name="exerciseName" className='formInput'></input>
          </label> */}

          <label className='label'><h3>Time</h3>
            <div className='time'> From
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

      <Link to = "/">{NavigationBar()}</Link>

    </div>

  );

}