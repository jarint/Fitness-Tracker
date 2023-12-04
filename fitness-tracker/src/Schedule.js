import { Link } from 'react-router-dom'
import './App.css'
import calendar from './Calendar'
import navbar from './Navbar'

export default function Schedule() {
  function handleSubmit(e){
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries( formData.entries());
    console.log(formJson);
  }

  return (
    <div className="base">

    <div className= "banner">
      <h2> Calendar</h2>
    </div>

    {calendar()}


    <div className='scheduleEvent'>
      <h2 id='scheduleTitle'> Schedule an Event</h2>
        <form className='scheduleExercise' onSubmit={handleSubmit}>
            <label>
                Event Name
                <input type = "text" name = "eventTitle"></input>
            </label>

            <label>Exercise Name 
              <input type = "text" name = "exerciseName"></input>
            </label>

            <label>Time
              <div className='time'>
                <input type = "time" name = "startTime"></input>
                <p>To</p>
                <input type = "time" name = "endTime"></input>
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
      
      {navbar()}

    </div>

  );

}