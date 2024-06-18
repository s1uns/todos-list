import React from "react";
import { FormControl } from "@mui/material";
import { RadioGroup } from "../../../shared/components/RadioGroup";
import {
    GENDER_FEMALE,
    GENDER_MALE,
    GENDER_OTHER,
} from "../../../shared/constants";
import { FormHelperText } from "@mui/material";

const genderOptions = [
    { value: GENDER_MALE, label: "Male" },
    { value: GENDER_FEMALE, label: "Female" },
    { value: GENDER_OTHER, label: "Other" },
];

const GenderSelector = (props) => {
    const { meta } = props;
    const { name, onChange } = props.input;

    return (
        <FormControl sx={{ width: "100%" }}>
            <RadioGroup
                name={name}
                onChange={onChange}
                options={genderOptions}
                label="Your Gender"
            />
            <FormHelperText
                sx={{ display: "flex", justifyContent: "center" }}
                error={meta.error}
            >
                {meta.error ? meta.error : " "}
            </FormHelperText>
        </FormControl>
    );
};

export default GenderSelector;
