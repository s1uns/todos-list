import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleChangeUsername = (e) => {
        setUsername((prevUsername) => e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword((prevPassword) => e.target.value);
    };

    const handleLogin = () => {
        setUsername((prevUsername) => "");
        setPassword((prevPassword) => "");
        navigate("/");
    };

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
                    value={username}
                    onChange={handleChangeUsername}
                />
                <br />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleChangePassword}
                    required
                />
                <br />
                <Link to="/">
                    <button onClick={handleLogin}>Login</button>
                </Link>
            </div>
        </>
    );
};

export default LoginPage;
