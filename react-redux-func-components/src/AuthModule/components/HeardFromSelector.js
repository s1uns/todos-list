import React from "react";
import { Field } from "react-final-form";
import CheckBox from "../../shared/components/CheckBox";
import {
    HEARD_FROM_ADVERTISEMENT,
    HEARD_FROM_FRIEND,
    HEARD_FROM_INTERNET,
    HEARD_FROM_OTHER,
} from "../../shared/constants";

const heardFromOptions = [
    { value: HEARD_FROM_FRIEND, label: "Friend" },
    { value: HEARD_FROM_INTERNET, label: "Internet" },
    { value: HEARD_FROM_ADVERTISEMENT, label: "Advertisement" },
    { value: HEARD_FROM_OTHER, label: "Other" },
];

export default function HeardFromSelector(props) {
    const { meta } = props;
    const { name, onChange } = props.input;

    return (
        <div>
            <label className="form-label">How did you know about us?</label>
            <div className="form-row">
                {heardFromOptions.map(({ value, label }) => (
                    <label>
                        <Field
                            key={value}
                            id={value}
                            value={value}
                            name={name}
                            onChange={onChange}
                            type="checkbox"
                            component={CheckBox}
                        />
                        {label}
                    </label>
                ))}
            </div>
            {meta.error && (
                <span className="validation-error">{meta.error}</span>
            )}
        </div>
    );
}
