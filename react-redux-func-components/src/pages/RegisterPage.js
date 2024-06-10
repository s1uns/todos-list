import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actionRequestType } from "../store/actions/actionTypes";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch();

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

    const handleChangeFirstName = (e) => {
        setFirstName((prevFirstName) => e.target.value);
    };

    const handleChangeLastName = (e) => {
        setLastName((prevLastName) => e.target.value);
    };

    const handleRegister = () => {
        if (password === confirmPassword) {
            dispatch({
                type: actionRequestType.REGISTER_USER_REQUEST,
                payload: {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    username: username,
                    password: password,
                },
            });

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
                <div className="name-input">
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                        required
                        value={firstName}
                        onChange={handleChangeFirstName}
                    />
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name"
                        required
                        value={lastName}
                        onChange={handleChangeLastName}
                    />
                </div>
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
