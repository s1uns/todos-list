import React from "react";
import RadioButton from "../../shared/components/RadioButton";

export default function GenderRadioGroup({ meta }) {
    const genderOptions = [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
    ];
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
