import React from "react";
import { Field } from "react-final-form";

const RadioButton = ({ name, value, label }) => ( //NO OWN STATE
    <div className="radio-button">
        <Field
            name={name}
            component="input"
            type="radio"
            value={value}
            id={value}
        />
        <label htmlFor={value}>{label}</label>
    </div>
);

export default RadioButton;
