// import Datepicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";

// export default DatePicker;

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
