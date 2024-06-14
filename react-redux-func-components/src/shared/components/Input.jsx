import React from "react";

export default function Input(props) {
    const {inputType, input} = props
    console.log("Props: ", props);
    return (
        <>
            <input className="input" type={inputType} {...input} />
            <br />
            //input.meta.error
        </>
    );
}
