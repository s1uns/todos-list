import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actionRequestType } from "../store/actions/actionTypes";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleChangeEmail = (e) => {
        setEmail((prevUsername) => e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword((prevPassword) => e.target.value);
    };

    const handleLogin = () => {
        dispatch({
            type: actionRequestType.LOGIN_USER_REQUEST,
            payload: {
                email: email,
                password: password,
            },
        });

        return;
    };

    return (
        <>
            <h1>Login</h1>

            <div className="login-container">
                <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={handleChangeEmail}
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
                <button onClick={handleLogin}>Login</button>
            </div>
        </>
    );
};

export default LoginPage;
