import React from "react";
import RegistrationForm from "../components/RegistrationForm";
import { MainHeader } from "../../shared/components/Header";

const RegistrationPage = () => {
    return (
        <>
            <MainHeader>Register</MainHeader>
            <RegistrationForm />
        </>
    );
};

export default RegistrationPage;
