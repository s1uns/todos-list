import React from "react";
import { Field } from "react-final-form";

export default function CheckBox({ name, value, label }) { //.js everywhere //separate to folders //index.js for shorter imports
    return (
        <div>
            <Field
                name={name}
                component="input"
                type="checkbox"
                value={value}
                id={value}
            />
            <label className="form-checkbox" htmlFor={value}>
                {label}
            </label>
        </div>
    );
}
