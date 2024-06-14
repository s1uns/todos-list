import React from "react";
import { Field } from "react-final-form";
import CheckBox from "../../shared/components/CheckBox";

export default function HeardFromMultiSelect({ meta }) { //HeardFromSelector
    const heardFromOptions = [
        { value: "friend", label: "Friend" },
        { value: "internet", label: "Internet" },
        { value: "advertisement", label: "Advertisement" },
        { value: "other", label: "Other" },
    ];
    return (
        <div>
            <label className="form-label">How did you know about us?</label>
            <div className="form-row">
                {heardFromOptions.map((option) => (
                    <CheckBox
                        key={option.value}
                        name="heardFrom"
                        value={option.value}
                        label={option.label}
                    /> //
                ))}
            </div>
            {meta.error && (
                <span className="validation-error">{meta.error}</span>
            )}
        </div>
    );
}
