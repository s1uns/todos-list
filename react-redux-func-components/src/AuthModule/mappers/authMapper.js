import Input from "../../shared/components/Input";
import HeardFromSelector from "../components/HeardFromSelector";
import GenderSelector from "../components/GenderSelector";
import DatePickerWrapper from "../../shared/components/DatePicker";

const authMapper = {
    input: Input,
    heardFrom: HeardFromSelector,
    gender: GenderSelector,
    datePicker: DatePickerWrapper,
};

export default authMapper;
