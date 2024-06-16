import { RadioButton } from "../RadioButton";
import {
    Container,
    FormLabel,
    RadioGroup as MuiRadioGroup,
} from "@mui/material";
import StyledRadioGroup from "./RadioGroup.styled";

const RadioGroupContainer = (props) => {
    const { name, onChange, label, options } = props;

    return (
        <Container>
            <FormLabel id="radio-buttons-group-label">{label}</FormLabel>
            <StyledRadioGroup
                aria-labelledby="radio-buttons-group-label"
                name={name}
            >
                {options.map(({ value, label }) => (
                    <FormLabel>
                        <RadioButton
                            key={value}
                            value={value}
                            name={name}
                            onChange={onChange}
                        />
                        {label}
                    </FormLabel>
                ))}
            </StyledRadioGroup>
        </Container>
    );
};

export default RadioGroupContainer;
