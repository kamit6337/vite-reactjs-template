import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  currentDate: Date;
  handleDateChange: (value: Date | null) => void;
};

const DateAndTimePicker = ({ currentDate, handleDateChange }: Props) => {
  return (
    <div className="">
      <p className="text-xs mb-1">Completed By</p>
      <DatePicker
        selected={currentDate}
        onChange={handleDateChange}
        showTimeSelect
        dateFormat="Pp"
        placeholderText="Select date and time"
        className="border p-1 rounded cursor-pointer"
      />
    </div>
  );
};

export default DateAndTimePicker;
