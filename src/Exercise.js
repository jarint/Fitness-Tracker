// Author:David Oti-George
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
    <div className="exercise">
      <div className="text-wrapper" onClick={() => handleExerciseClicked(name)}>
        {name}
      </div>

      <div className="stats">
        <span>Sets:{sets}</span>
        <span>Reps:{reps}</span>
      </div>

      <div className="optionsx">
        <button
          className="rename_container"
          onClick={() => onRenameClicked(name)}
        >
          <img className="rename" alt="Options" src={renameIcon} />
        </button>

        <button
          className="trash_container"
          onClick={() => onDeleteClicked(name)}
        >
          <img className="trash" alt="Options" src={deleteIcon} />
        </button>
      </div>
    </div>
  );
}
