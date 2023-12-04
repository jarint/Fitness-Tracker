import './App.css'
import calendar from './Calendar';
import navbar from './Navbar'
import { Link } from 'react-router-dom'


export default function Home() {
  return (
    <div className='base'>
      <div className='banner'>
          <h2>Welcome!</h2>
        </div>
      {calendar()}

      <div className='info-panels'>
        <div className="activities">
          
          <div className='info' id='workouts'>
            <button type='button'>
              <h3> My Workouts </h3>
            </button>
            
          </div>

          <div className='info' id='time-active'>
            <button className='button' id ="time-active"><h3> Time Active </h3></button>
            
          </div>
        </div>

        <div className="activities">
          <div className= "info" id = "nutrition">
            <button className='button'>
              <h3> Nutrition </h3>
              <h3> Hydration </h3>
          </button>
            
          </div>
        </div>

      </div>

      {navbar()}
    </div>
  );
  
 
}

