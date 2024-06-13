import React, { useState } from "react";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
 
    return (
        <>
            <h1>Login</h1>
            <div className="login-container">
                <LoginForm />
            </div>
        </>
    );
};

export default LoginPage;
