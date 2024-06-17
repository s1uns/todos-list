import React from "react";
import { Checkbox as MuiCheckbox } from "@mui/material";


const CheckBox = (props) => {
    const { input, value, name } = props;

    return (
        <MuiCheckbox
            value={value}
            name={name}
            {...props}
            {...input}
        />
    );
};

export default CheckBox;
