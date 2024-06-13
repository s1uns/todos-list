import React from "react";

export default function Input({ ...props }) {
    return (
        <>
            <input className="input" {...props} required />
            <br />
        </>
    );
}
