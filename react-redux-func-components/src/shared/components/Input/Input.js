import React from "react";
import { TextField } from "@mui/material";

const Input = (props) => {
    const { autoFocus, inputType, placeholder, input, meta } = props;

    console.log("Props: ", props);

    return (
        <TextField
            autoFocus={autoFocus ? true : false}
            type={inputType}
            placeholder={placeholder}
            error={meta?.error ? true : false}
            helperText={meta ? (meta.error ? meta.error : " ") : ""}
            {...input}
            {...props}
        />
    );
};

export default Input;
