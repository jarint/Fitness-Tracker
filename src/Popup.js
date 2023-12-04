import React from "react";
import "./Popup.css";

export default function popup({
  children,
  prompt,
  option,
  handleOptionCLicked,
  handleCancelCLicked,
}) {
  return (
    <div className="popup-container">
      <div className="overlay"></div>

      <div className="popup">
        <div className="popup-inner">
          <h1>{prompt}</h1>
          <div className="popup-content">{children}</div>
          <div className="popup-footer">
            <button onClick={handleCancelCLicked} className="cancel-button ">
              Cancel
            </button>
            <button onClick={handleOptionCLicked} className="option-button">
              {option}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
