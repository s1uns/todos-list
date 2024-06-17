import React from "react";
import LoginForm from "../components/LoginForm";
import { MainHeader } from "../../shared/components/Header";

const LoginPage = () => {
    return (
        <>
            <MainHeader>Login</MainHeader>
            <LoginForm />
        </>
    );
};

export default LoginPage;
