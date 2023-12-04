import { Link } from 'react-router-dom'
import './App.css'

const day = [
  {
    "startTime": "09:00",
    "endTime": "10:30",
    "eventTitle": "Jog"
  }
]

const sunday = [
  { startTime: "09:00", endTime:"10:00", eventName: "Jogging"},
  { startTime: "10:00", endTime:"10:30", eventName: "Walk"},
  { startTime: "12:00", endTime: "13:00", eventName: "Dance Class"},
]

const monday = [
  { startTime: "09:00", endTime:"10:00", eventName: "Jogging"},
  { startTime: "12:00", endTime:"12:30", eventName: "Dance Class"},
]

const tuesday = [
  { startTime: "09:00", endTime:"10:00", eventName: "Jogging"},
  { startTime: "12:00", endTime:"12:30", eventName: "Dance Class"},
]

const wednesday= [
  { startTime: "09:00", endTime:"10:00", eventName: "Jogging"},
  { startTime: "12:00", endTime:"12:30", eventName: "Dance Class"},
]

const thursday = [
  { startTime: "09:00", endTime:"10:00", eventName: "Jogging"},
  { startTime: "12:00", endTime:"12:30", eventName: "Dance Class"},
]

const friday = [
  { startTime: "09:00", endTime:"10:00", eventName: "Jogging"},
  { startTime: "12:00", endTime:"12:30", eventName: "Dance Class"},
]

const saturday = [
  { startTime: "09:00", endTime:"10:00", eventName: "Jogging"},
  { startTime: "12:00", endTime:"12:30", eventName: "Dance Class"},
]

function createButton(dayName){
  return(
    <Link to="/Schedule"><button type='button' className= 'dayEvent'>
        {dayName.map((val)=>{
          return(
            <div className='event' key={val}>
              {val.eventName}
              <br></br>
              {val.startTime} - {val.endTime}
            </div>
          )
        })}
    </button></Link>
  )
}

function calendar(){
  /*
  Day of week
  Time
  Event Name
*/
  return (
    <div className='base'>
      <div className="calendar">
        <div className='day'>
          <h5>Sun</h5>
          {createButton(sunday)}
        </div>

        <div className='day'>
          <h5>Mon</h5>
          {createButton(monday)}
        </div>

        <div className='day'>
          <h5>Tue</h5>
          {createButton(tuesday)}
        </div>

        <div className='day'>
          <h5>Wed</h5>
          {createButton(wednesday)}
        </div>

        <div className='day'>
          <h5>Thu</h5>
          {createButton(thursday)}
        </div>

        <div className='day'>
          <h5>Fri</h5>
          {createButton(friday)}
        </div>

        <div className='day'>
          <h5>Sat</h5>
          {createButton(saturday)}
        </div>
      </div>
    </div>
)

}

export default function Calendar() {

  return (
    <div className="calendar">

    {calendar()}

    </div>

  );

}