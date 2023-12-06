import { Link, useLocation} from 'react-router-dom'
import './App.css'
import Popup from "./Popup";
import renameIcon from "./icons/rename.png";
import deleteIcon from "./icons/trash3.svg";

// const week = [
//   {"Sunday": sunday}, 
//   {"Monday": monday},
//   {"Tuesday": tuesday}, 
//   {"Wednesday" :wednesday},
//   {"Thursday": thursday}, 
//   {"Friday":friday},
//   {"Saturday":saturday}];

var sunday = [
  { startTime: "09:00", endTime:"10:00", eventName: "Jogging"},
  { startTime: "10:00", endTime:"10:30", eventName: "Walk"},
  { startTime: "12:00", endTime: "13:00", eventName: "Dance Class"},
]

var monday = [
  { startTime: "09:00", endTime:"10:00", eventName: "Jogging"},
  { startTime: "12:00", endTime:"12:30", eventName: "Dance Class"},
]

var tuesday = [
]

const wednesday= [
  // { startTime: "09:00", endTime:"10:00", eventName: "Jogging"},
  { startTime: "12:00", endTime:"12:30", eventName: "Dance Class"},
]

const thursday = [
  { startTime: "09:00", endTime:"10:00", eventName: "Jogging"},
  // { startTime: "12:00", endTime:"12:30", eventName: "Dance Class"},
]

const friday = [
  // { startTime: "09:00", endTime:"10:00", eventName: "Jogging"},
  { startTime: "12:00", endTime:"12:30", eventName: "Dance Class"},
]

const saturday = [
  { startTime: "09:00", endTime:"10:00", eventName: "Jogging"},
  // { startTime: "12:00", endTime:"12:30", eventName: "Dance Class"},
]

function handleClick(e){
  // console.log(e);
}

function createButton(dayName, dayString){
  var valuesInObj = Object.values(dayName).length;

  return(
    <Link to={`/Schedule`} state={dayString}><button type='button' className= 'dayEvent'>
        {dayName.map((val, index)=>{
            return(
            <div className='event' key={index}>
              {val.eventName}
              <br></br>
              {val.startTime} - {val.endTime}
            </div>
          )
        })}
    </button></Link>
  )
}

/**
 * 
 * @param {*} event - the event being removed
 * @param {*} day - day of the week of the event
 */
function onDeleteClicked(event, day){
  var dayName = getDayFromString(day);
  const newSchedule = dayName.filter((value)=>(
    value.eventName !== event
  ));
  console.log(newSchedule)
  updateEvent(day, newSchedule, false);
  calendar();
  
}



function getDayFromString(day){
  var dayName;
  switch(day){
    case "Sunday":
      dayName = sunday
      break;
    
    case "Monday":
      dayName = monday;
      break;

    case "Tuesday":
      dayName = tuesday;
      break;

    case "Wednesday":
      dayName = wednesday;
      break;

    case "Thursday":
      dayName = thursday;
      break;

    case "Friday":
      dayName = friday;
      break;
    
    case "Saturday":
      dayName = saturday;
      break;

    default:
      break;
  }
  return dayName;
}

export function displayEvents(day){
  var dayName = getDayFromString(day);
  return (
    <div className='eventsList'>
      <h2 id='scheduleTitle'> Events for {day}</h2>
        {dayName.map((val, index)=>{
              return(
              <div className='eventListItem' key={index}>
                
                {val.eventName}
                <br></br>
                {val.startTime} - {val.endTime}

                <div className="options" id='eventOptions'>
                  <button
                    className="trash_container"
                    onClick={() => onDeleteClicked(val.eventName, day)}
                  >
                    <img className="trash" alt="Options" src={deleteIcon} />
                  </button>
                </div>
              </div>
            )
            })}
    </div>
    
    
  );
}

/**
 * 
 * @param {*} dayName - string name of day of week
 * @param {*} formJson  - 
 * @param {*} addEvent - true if event is being added, false if its being deleted
 */
export function updateEvent(dayName, formJson, addEvent){
  var objLength;

  switch( dayName ){
    case "Sunday":
      objLength = sunday.length;
      if (!addEvent){
        sunday = formJson;
        console.log("Sunday",sunday);
        calendar();
        return;
      }
      sunday[objLength]= 
      { startTime: formJson.startTime , 
        endTime: formJson.endTime, 
        eventName: formJson.eventName  }
      break;
      
    case "Monday":
      objLength = monday.length;
      monday[objLength]= 
      { startTime: formJson.startTime , 
        endTime: formJson.endTime, 
        eventName: formJson.eventName  }

      break;

    case "Tuesday":
      objLength = tuesday.length;
      tuesday[objLength]= 
      { startTime: formJson.startTime , 
        endTime: formJson.endTime, 
        eventName: formJson.eventName  }
      break;

    case "Wednesday":
      objLength = wednesday.length;
      wednesday[objLength]= 
      { startTime: formJson.startTime , 
        endTime: formJson.endTime, 
        eventName: formJson.eventName  }

      break;

    case "Thursday":
      objLength = thursday.length;
      thursday[objLength]= 
      { startTime: formJson.startTime , 
        endTime: formJson.endTime, 
        eventName: formJson.eventName  }

      break;

    case "Friday":
      objLength = friday.length;
      friday[objLength]= 
      { startTime: formJson.startTime , 
        endTime: formJson.endTime, 
        eventName: formJson.eventName  }
      
      break;

    case "Saturday":
      objLength = saturday.length;
      saturday[objLength]= 
      { startTime: formJson.startTime , 
        endTime: formJson.endTime, 
        eventName: formJson.eventName  }

      break;
  }
  
  calendar();
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
          <Link to= {`/Schedule`} state={"Sunday"} ><button type='button' className= 'dayEvent' id = "sunday">
            {console.log("Main calendar", sunday)}
            {sunday.map((val, index)=>{
              return(
                <div className='event' key={index}>
                  {val.eventName}
                  <br></br>
                  {val.startTime} - {val.endTime}
                </div>
              )
            })}
        </button></Link>
        </div>

        <div className='day'>
          <h5>Mon</h5>
          <Link to= {`/Schedule`} state={"Monday"}><button type='button' className= 'dayEvent' id = "sunday">
            {monday.map((val, index)=>{
              return(
                <div className='event' key={index}>
                  {val.eventName}
                  <br></br>
                  {val.startTime} - {val.endTime}
                </div>
              )
            })}
        </button></Link>
        </div>

        <div className='day'>
          <h5>Tue</h5>
          <Link to= {`/Schedule`} state={"Tuesday"} ><button type='button' onClick = {(e) => handleClick(e)} className= 'dayEvent' id = "sunday">
            {tuesday.map((val, index)=>{
              return(
                <div className='event' key={index}>
                  {val.eventName}
                  <br></br>
                  {val.startTime} - {val.endTime}
                </div>
              )
            })}
        </button></Link>
        </div>

        <div className='day'>
          <h5>Wed</h5>
          <Link to= {`/Schedule`} state={"Wednesday"} ><button type='button' onClick = {(e) => handleClick(e)} className= 'dayEvent' id = "sunday">
            {wednesday.map((val, index)=>{
              return(
                <div className='event' key={index}>
                  {val.eventName}
                  <br></br>
                  {val.startTime} - {val.endTime}
                </div>
              )
            })}
        </button></Link>
        </div>

        <div className='day'>
          <h5>Thu</h5>
          <Link to= {`/Schedule`} state={"Thursday"} ><button type='button' onClick = {(e) => handleClick(e)} className= 'dayEvent' id = "sunday">
            {thursday.map((val, index)=>{
              return(
                <div className='event' key={index}>
                  {val.eventName}
                  <br></br>
                  {val.startTime} - {val.endTime}
                </div>
              )
            })}
        </button></Link>
        </div>

        <div className='day'>
          <h5>Fri</h5>
          <Link to= {`/Schedule`} state={"Friday"} ><button type='button' onClick = {(e) => handleClick(e)} className= 'dayEvent' id = "friday">
            {friday.map((val, index)=>{
              return(
                <div className='event' key={index}>
                  {val.eventName}
                  <br></br>
                  {val.startTime} - {val.endTime}
                </div>
              )
            })}
        </button></Link>
        </div>

        <div className='day'>
          <h5>Sat</h5>
          <Link to= {`/Schedule`} state={"Saturday"} ><button type='button' onClick = {(e) => handleClick(e)} className= 'dayEvent' id = "sunday">
            {saturday.map((val, index)=>{
              return(
                <div className='event' key={index}>
                  {val.eventName}
                  <br></br>
                  {val.startTime} - {val.endTime}
                </div>
              )
            })}
        </button></Link>
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