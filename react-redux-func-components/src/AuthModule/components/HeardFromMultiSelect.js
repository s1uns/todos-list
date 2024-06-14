import React from "react";
import { Field } from "react-final-form";

export default function HeardFromMultiSelect(props) {
    const { meta } = props;
    return (
        <div>
            <div>
                <label className="form-label">How did you know about us?</label>
            </div>
            <div className="form-row">
                <div>
                    <Field
                        name="heardFrom"
                        component="input"
                        type="checkbox"
                        value="friend"
                        id="friend"
                    />
                    <label className="form-checkbox" htmlFor="friend">
                        Friend
                    </label>
                </div>
                <div>
                    <Field
                        name="heardFrom"
                        component="input"
                        type="checkbox"
                        value="internet"
                        id="internet"
                    />
                    <label className="form-checkbox" htmlFor="internet">
                        Internet
                    </label>
                </div>
            </div>
            <div className="form-row">
                <div>
                    <Field
                        name="heardFrom"
                        component="input"
                        type="checkbox"
                        value="advertisement"
                        id="advertisement"
                    />
                    <label className="form-checkbox" htmlFor="advertisement">
                        Advertisement
                    </label>
                </div>
                <div>
                    <Field
                        name="heardFrom"
                        component="input"
                        type="checkbox"
                        value="other"
                        id="other"
                    />
                    <label className="form-checkbox" htmlFor="Other">
                        Other
                    </label>
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
