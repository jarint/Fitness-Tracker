import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../Topbar";
import { Link } from "react-router-dom";
import "./Stats.css";

const Stats = ({ dataByDate, setDataByDate, statsPageExercise, date }) => {
  const [weight, setWeight] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [notes, setNotes] = useState("");
  const dateString = new Date(date + "T00:00:00").toDateString();

  const navigate = useNavigate();
  const exercises = dataByDate[dateString];
  const selectedExercise = exercises.find(
    (exercise) => exercise.name === statsPageExercise
  );

  useEffect(() => {
    setNotes(selectedExercise.notes);
    setReps(selectedExercise.reps);
    setWeight(selectedExercise.weight);
    setSets(selectedExercise.sets);
  }, [selectedExercise]);

  function onCancelClicked() {
    navigate("/Workouts");
  }

  function onSaveClicked() {
    const sDataByDate = dataByDate;

    const workouts = sDataByDate[dateString];

    sDataByDate[date] = workouts.map((exercise) => {
      if (exercise.name === statsPageExercise) {
        exercise.weight = Number(weight);
        exercise.reps = Number(reps);
        exercise.sets = Number(sets);
        exercise.notes = notes;
      }
      return exercise;
    });

    setDataByDate(sDataByDate);

    navigate("/Workouts");
  }

  return (
    <div className="stats_container">
      <Link to="/Workouts">
        <button
          className="back-utton"
          style={{ position: 'absolute', top: 0, left: 10 }}

        >
          BACK
        </button>
      </Link>
      <h1>My Stats</h1>
      <br />
      <div className="s_exercise_info_date">{dateString}</div>

      <div className="s_exercise_stats">
        <div className="s_exercise_name">{statsPageExercise}</div>
        <div className="s_weight_stat">
          <label>Weight:</label>
          <input
            className="s_weight_input"
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Weight(lbs)"
            minLength={1}
            maxLength={3}
          />
          <label>lbs</label>
        </div>

        <div className="s_set_stat">
          <label>Sets:</label>
          <input
            className="s_set_input"
            type="text"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
            placeholder="Sets.."
            minLength={1}
            maxLength={3}
          />
        </div>

        <div className="s_rep_stat">
          <label>Reps:</label>
          <input
            className="s_rep_input"
            type="text"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            placeholder="Reps.."
            minLength={1}
            maxLength={3}
          />
        </div>

        <div className="s_notes_stat">
          <label>Notes:</label>
          <textarea
            className="s_notes_input"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes.."
            rows={4} // Set the number of visible rows
            cols={20} // Set the number of visible columns
          />
        </div>
        <div className="s_buttons">
          <button className="s_cancel_button" onClick={onCancelClicked}>
            Cancel
          </button>
          <button className="s_save-button" onClick={onSaveClicked}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stats;
