import React from "react";
import { Field } from "react-final-form";

export default function GenderRadioGroup(props) {
    const { meta } = props;

    return (
        <div className="gender-radio">
            <div>
                <label className="form-label">Gender</label>
            </div>
            <div className="form-row">
                <div className="gender-radio">
                    <Field
                        name="gender"
                        component="input"
                        type="radio"
                        value="male"
                        id="male"
                    />
                    <label htmlFor="male">Male</label>
                </div>
                <div className="gender-radio">
                    <Field
                        name="gender"
                        component="input"
                        type="radio"
                        value="female"
                        id="female"
                    />
                    <label htmlFor="female">Female</label>
                </div>
                <div className="gender-radio">
                    <Field
                        name="gender"
                        component="input"
                        type="radio"
                        value="other"
                        id="female"
                    />
                    <label htmlFor="other">Other</label>
                </div>
            </div>
            {meta.error ? (
                <span className="validation-error">{meta.error}</span>
            ) : (
                ""
            )}
        </div>
    );
}
