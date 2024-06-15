import React from "react";
import { Field } from "react-final-form";

export default function CheckBox(props) {
    const { input, value, name } = props;

    return <input value={value} name={name} {...input} />;
}
