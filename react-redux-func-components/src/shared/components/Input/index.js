import React from "react";
import { TextField } from "@mui/material";
import { styled } from "@mui/material";

const StyledInput = styled(TextField)({
    margin: 3,
    "& .MuiInputLabel-root:not(.MuiInputLabel-shrink)": {
        transform: "translate(14px, 8px) scale(1)",
    },
    "& .MuiInputLabel-root": {
        color: "green",
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: "purple",
    },
    "& .MuiInputBase-input": {
        width: "100%",
        padding: 8,
    },
});

export default function Input(props) {
    const { inputType, placeholder, input, meta } = props;

    return (
        <StyledInput
            className="input"
            type={inputType}
            placeholder={placeholder}
            error={meta?.error ? true : false}
            helperText={meta?.error ? meta.error : " "}
            {...input}
        />
    );
}
