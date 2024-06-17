import React from "react";
import { Field } from "react-final-form";
import CheckBox from "../../../shared/components/CheckBox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Container, FormHelperText, FormLabel, Grid } from "@mui/material";

import {
    HEARD_FROM_ADVERTISEMENT,
    HEARD_FROM_FRIEND,
    HEARD_FROM_INTERNET,
    HEARD_FROM_OTHER,
} from "../../../shared/constants";

const heardFromOptions = [
    { value: HEARD_FROM_FRIEND, label: "Friend" },
    { value: HEARD_FROM_INTERNET, label: "Internet" },
    { value: HEARD_FROM_ADVERTISEMENT, label: "Advertisement" },
    { value: HEARD_FROM_OTHER, label: "Other" },
];

const HeardFromSelector = (props) => {
    const { meta } = props;
    const { name, onChange } = props.input;

    return (
        <Container sx={{ display: "flex", flexDirection: "column" }}>
            <FormLabel id="checkbox-buttons-group-label">
                How did you know about us?
            </FormLabel>
            <Grid container spacing={2}>
                {heardFromOptions.map(({ value, label }) => (
                    <Grid item xs={6}>
                        <FormControlLabel
                            control={
                                <Field
                                    key={value}
                                    id={value}
                                    value={value}
                                    name={name}
                                    onChange={onChange}
                                    type="checkbox"
                                    component={CheckBox}
                                />
                            }
                            label={label}
                        ></FormControlLabel>
                    </Grid>
                ))}
            </Grid>
            <FormHelperText
                sx={{ display: "flex", justifyContent: "center" }}
                error={meta.error}
            >
                {meta.error ? meta.error : " "}
            </FormHelperText>
        </Container>
    );
};

export default HeardFromSelector;
