import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const DatePickerWrapper = (props) => {
    const { onBlur, onChange, onFocus, value } = props;
    const [startDate, setStartDate] = useState(value);
    return (
        <div>
            <DatePicker
                className="input"
                dateFormat="dd.MM.yyyy"
                showPopperArrow={false}
                showMonthDropdown
                dropdownMode="select"
                selected={startDate}
                onChange={(value) => {
                    setStartDate(value);
                    onChange(value);
                }}
                todayButton="Today"
                onBlur={onBlur}
                onFocus={onFocus}
                value={value}
            />
        </div>
    );
};

export default DatePickerWrapper;
