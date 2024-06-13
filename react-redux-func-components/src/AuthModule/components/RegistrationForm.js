import Form from "../../shared/components/Form";
import { Field } from "react-final-form";
import { useDispatch } from "react-redux";
import { actionRequestType } from "../../store/actions/actionTypes";
import React from "react";
import Input from "../../shared/components/Input";

export default function RegistrationForm() {
    const genderOptions = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
    ];

    const handleRegister = () => {
        // if (password === confirmPassword) {
        //     dispatch({
        //         type: actionRequestType.REGISTER_USER_REQUEST,
        //         payload: {
        //             email: email,
        //             firstName: firstName,
        //             lastName: lastName,
        //             username: username,
        //             password: password,
        //         },
        //     });
        //     return;
        // }
        // alert("Passwords mismatch!");
    };

    return (
        <Form
            submitBtnName={"Register"}
            onSubmit={handleRegister}
            validate={validate}
        >
            <div>
                <Field
                    name="email"
                    render={({ input, meta }) => (
                        <div>
                            <Input
                                {...input}
                                type="email"
                                placeholder="Email"
                            />
                            {meta.touched &&
                                meta.error &&
                                {
                                    /* <Error error={meta.error} /> */
                                }}
                        </div>
                    )}
                />
            </div>
            <div>
                <Field
                    name="username"
                    render={({ input, meta }) => (
                        <div>
                            <Input
                                {...input}
                                type="text"
                                placeholder="Username"
                            />
                            {meta.touched &&
                                meta.error &&
                                {
                                    /* <Error error={meta.error} /> */
                                }}
                        </div>
                    )}
                />
            </div>
        </Form>
    );
}
