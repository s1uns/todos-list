import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputLabel from "@mui/material/InputLabel";
import { Container } from "@mui/material";
import { FormHelperText } from "@mui/material";

const DatePickerWrapper = (props) => {
    const { placeholder, meta, input } = props;
    const { onBlur, onChange, onFocus, value } = input;

    return (
        <Container sx={{ width: "50%" }}>
            <InputLabel className="form-label">{placeholder}</InputLabel>

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
            <FormHelperText
                sx={{ display: "flex", justifyContent: "center" }}
                error={meta.error}
            >
                {meta.error ? meta.error : " "}
            </FormHelperText>
        </Container>
    );
};

export default DatePickerWrapper;
