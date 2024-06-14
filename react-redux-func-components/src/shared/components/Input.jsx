import React from "react";

export default function Input(props) {
    const { inputType, placeholder, input, meta } = props;

    console.log("Props: ", props);

    return (
        <div className="input-container">
            <input
                className="input"
                type={inputType}
                placeholder={placeholder}
                {...input}
            />
            {meta.error ? (
                <span className="validation-error">{meta.error}</span>
            ) : (
                ""
            )}
        </div>
    );
}
