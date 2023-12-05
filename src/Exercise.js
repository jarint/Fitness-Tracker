import React from "react";
import "./Exercise.css";
import renameIcon from "./icons/rename.png";
import deleteIcon from "./icons/trash3.svg";
export default function Exercise({
  name,
  sets,
  reps,
  onDeleteClicked,
  onRenameClicked,
  handleExerciseClicked,
}) {
  return (
    <div className="e-exercise">
      <div className="text-wrapper" onClick={() => handleExerciseClicked(name)}>
        {name}
      </div>

      <div className="e-stats">
        <span>Sets:{sets}</span>
        <span>Reps:{reps}</span>
      </div>

      <div className="e-options">
        <button
          className="e-rename_container"
          onClick={() => onRenameClicked(name)}
        >
          <img className="e-rename" alt="Options" src={renameIcon} />
        </button>

        <button
          className="e-trash_container"
          onClick={() => onDeleteClicked(name)}
        >
          <img className="e-trash" alt="Options" src={deleteIcon} />
        </button>
      </div>
    </div>
  );
}
