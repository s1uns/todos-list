import React from "react";
import RegistrationForm from "../components/RegistrationForm";
import { MainHeader } from "../../shared/components/Header";

export default function RegistrationPage() {
    return (
        <>
            <MainHeader>Register</MainHeader>
            <RegistrationForm />
        </>
    );
}
