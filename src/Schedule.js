import { Link } from 'react-router-dom'
import './App.css'
import calendar from './Calendar'

import NavigationBar from './pages/NavigationBar';

export default function Schedule() {
  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
  }

  return (
    <div className="base">

      <div className="banner">
        <h2> Calendar</h2>
      </div>

      {calendar()}


      <div className='scheduleEvent'>
        <h2 id='scheduleTitle'> Schedule an Event</h2>
        <form className='scheduleExercise' onSubmit={handleSubmit}>
          <label className='label'>
            Event Name
            <input type="text" name="eventTitle" className='formInput'></input>
          </label>

          <label className='label'>Exercise Name
            <input type="text" name="exerciseName" className='formInput'></input>
          </label>

          <label className='label'>Time
            <div className='time'>
              <input type="time" name="startTime" className='formInput'></input>
              <p>To</p>
              <input type="time" name="endTime" className='formInput'></input>
            </div>
          </label>

          <div className='formButtons'>
            {/* <Link to="/"><button className='formButton' type='submit'>Save</button></Link>
              <br></br> */}
            <button className='formButton' type='submit'>Save</button>

            <Link to="/"><button className='formButton'>Cancel</button></Link>
          </div>
        </form>



      </div>

      <NavigationBar />

    </div>

  );

}