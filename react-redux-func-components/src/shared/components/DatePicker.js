import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const DatePickerWrapper = (props) => {
    const { labelText, meta, input } = props;
    const { onBlur, onChange, onFocus, value } = input;
    const [startDate, setStartDate] = useState(value);
    return (
        <div className="date-container">
            <label className="form-label">{labelText}</label>

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
            {meta.error ? (
                <span className="validation-error">{meta.error}</span>
            ) : (
                ""
            )}
        </div>
    );
};

export default DatePickerWrapper;
