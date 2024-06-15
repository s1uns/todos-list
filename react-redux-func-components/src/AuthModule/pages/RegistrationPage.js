import React from "react";
import RegistrationForm from "../components/RegistrationForm";

export default function RegistrationPage() {
    return (
        <>
            <h1>Register</h1>

            <div className="registration-container">
                <RegistrationForm />
            </div>
        </>
    );
}
