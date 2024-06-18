import HeardFromSelector from "../components/HeardFromSelector";
import GenderSelector from "../components/GenderSelector";
import { DatePicker } from "../../../shared/components/DatePicker";
import { Input } from "../../../shared/components/Input";

const authMapper = {
    input: Input,
    heardFrom: HeardFromSelector,
    gender: GenderSelector,
    datePicker: DatePicker,
};

export default authMapper;
