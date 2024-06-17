import React from "react";
import RegistrationForm from "../components/RegistrationForm";
import { Typography } from "@mui/material";

const RegistrationPage = () => {
    return (
        <>
            <Typography variant="h1">Register</Typography>
            <RegistrationForm />
        </>
    );
};

export default RegistrationPage;
