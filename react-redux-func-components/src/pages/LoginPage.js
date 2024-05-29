import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
    return (
        <>
            <h1>Login</h1>

            <div className="login-container">
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    required
                />
                <br />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                />
                <br />
                <Link to="/">
                    <button>Login</button>
                </Link>
            </div>
        </>
    );
};

export default LoginPage;
