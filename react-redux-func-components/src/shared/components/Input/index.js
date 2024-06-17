import React from "react";
import { TextField } from "@mui/material";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";

const Input = (props) => {
    const { inputType, placeholder, input, meta } = props;

    return (
        <TextField
            autoFocus
            type={inputType}
            placeholder={placeholder}
            error={meta?.error ? true : false}
            helperText={meta?.error ? meta.error : " "}
            {...input}
            {...props}
        />
    );
};

export default Input;
