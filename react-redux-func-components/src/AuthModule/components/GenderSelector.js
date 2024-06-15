import React from "react";
import RadioButton from "../../shared/components/RadioButton/RadioButton";
import {
    GENDER_FEMALE,
    GENDER_MALE,
    GENDER_OTHER,
} from "../../shared/constants";

const genderOptions = [
    { value: GENDER_MALE, label: "Male" },
    { value: GENDER_FEMALE, label: "Female" },
    { value: GENDER_OTHER, label: "Other" },
];

export default function GenderSelector(props) {
    const { meta } = props;
    const { name, onChange } = props.input;

    return (
        <div className="gender-radio">
            <label className="form-label">Gender</label>
            <div className="form-row">
                {genderOptions.map(({ value, label }) => (
                    <label>
                        <RadioButton
                            key={value}
                            value={value}
                            name={name}
                            onChange={onChange}
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
