import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleChangeUsername = (e) => {
        setUsername((prevUsername) => e.target.value);
    };

    const handleChangeEmail = (e) => {
        setEmail((prevEmail) => e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword((prevPassword) => e.target.value);
    };

    const handleChangeConfirmPassword = (e) => {
        setConfirmPassword((prevPassword) => e.target.value);
    };

    const handleRegister = () => {
        if (password === confirmPassword) {
            setUsername((prevUsername) => "");
            setEmail((prevUsername) => "");
            setPassword((prevPassword) => "");
            setConfirmPassword((prevPassword) => "");
            navigate("/");
            return;
        }

        alert("Passwords mismatch!");
    };
    return (
        <>
            <h1>Register</h1>

            <div className="login-container">
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={handleChangeEmail}
                />
                <br />
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
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={handleChangeConfirmPassword}
                    required
                />
                <br />
                <button onClick={handleRegister}>Register</button>
            </div>
        </>
    );
}
