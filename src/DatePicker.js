// Author:David Oti-George
import "./DatePicker.css";

export default function DatePicker({
  selectedDate,
  setDate,
  toggleDatePicker,
}) {
  return (
    <input
      className="date_input"
      type="date"
      value={selectedDate}
      onChange={(e) => {
        setDate(e.target.value);
        toggleDatePicker();
      }}
      onMouseLeave={toggleDatePicker}
    />
  );
}
