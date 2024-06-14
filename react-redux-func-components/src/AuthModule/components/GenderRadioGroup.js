import React from "react";
import RadioButton from "../../shared/components/RadioButton";
const genderOptions = [
    { value: GENDER_MALE, label: "Male" }, //numbers
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
];

const GENDER_MALE = 1;

export default function GenderRadioGroup({ meta }) { //Gender selector

    return (
        <div className="gender-radio">
            <label className="form-label">Gender</label>
            <div className="form-row">
                {genderOptions.map((option) => (
                    <RadioButton
                        key={option.value}
                        name="gender"
                        value={option.value}
                        label={option.label}
                    />
                ))}
            </div>
            {meta.error && (
                <span className="validation-error">{meta.error}</span>
            )}
        </div>
    );
}
