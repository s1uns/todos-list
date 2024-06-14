import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actionRequestType } from "../../store/actions/actionTypes";
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
