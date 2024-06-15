import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const DatePickerWrapper = (props) => {
    const { labelText, meta, input } = props;
    const { onBlur, onChange, onFocus, value } = input;
    return (
        <div className="date-container">
            <label className="form-label">{labelText}</label>

            <DatePicker
                className="input"
                dateFormat="dd.MM.yyyy"
                showPopperArrow={false}
                showMonthDropdown
                dropdownMode="select"
                onChange={(value) => {
                    onChange(value);
                }}
                todayButton="Today"
                onBlur={onBlur}
                onFocus={onFocus}
                value={value}
                selected={value}
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
