import React from "react";
import Checkbox from "@mui/material/Checkbox";

export default function CheckBox(props) {
    const { input, value, name } = props;

    return <Checkbox value={value} name={name} {...input} />;
}
