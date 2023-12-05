import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Homepage";
import Schedule from "./Schedule";
import { useState } from "react";
import dataByDate from "./Data";
import Workouts from "./pages/Workouts";
import Stats from "./pages/Stats";
// Import your pages here

//State that needs to be shared between Stats and Workouts is, dataByDate date of exercise, and that exercises Data
const data = dataByDate;
function App() {
  const [dataByDate, setDataByDate] = useState(data); //
  const [date, setDate] = useState("2023-12-01"); //lifted state variable from Workouts.js
  const [statsPageExercise, setStatsPageExercise] = useState();
  return (
    // Add your paths here
    // Moved the home page to a separate file
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route
          path="/Stats"
          element={
            <Stats
              statsPageExercise={statsPageExercise}
              setStatsPageExercise={setStatsPageExercise}
              date={date}
              setDate={setDate}
              dataByDate={dataByDate}
              setDataByDate={setDataByDate}
            />
          }
        ></Route>
        <Route
          path="/Workouts"
          element={
            <Workouts
              statsPageExercise={statsPageExercise}
              setStatsPageExercise={setStatsPageExercise}
              date={date}
              setDate={setDate}
              dataByDate={dataByDate}
              setDataByDate={setDataByDate}
            />
          }
        ></Route>
      </Routes>
  );
}

export default App;
