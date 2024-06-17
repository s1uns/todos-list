import React from "react";
import LoginForm from "../components/LoginForm";
import { Typography } from "@mui/material";

const LoginPage = () => {
    return (
        <>
            <Typography variant="h1">Login</Typography>
            <LoginForm />
        </>
    );
};

export default LoginPage;
