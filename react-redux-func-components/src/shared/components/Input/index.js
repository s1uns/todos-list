import React from "react";
import StyledInput from "./Input.styled";

export default function Input(props) {
    const { inputType, placeholder, input, meta } = props;

    return (
            <StyledInput
                className="input"
                type={inputType}
                placeholder={placeholder}
                error={meta.error}
                helperText={meta.error ? meta.error : " "}
                {...input}
            />
    );
}
