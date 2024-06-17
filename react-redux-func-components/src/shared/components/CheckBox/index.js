import React from "react";
import Checkbox from "@mui/material/Checkbox";

const CheckBox = (props) => {
    const { input, value, name } = props;

    return <Checkbox value={value} name={name} {...input} />;
};

export default CheckBox;
