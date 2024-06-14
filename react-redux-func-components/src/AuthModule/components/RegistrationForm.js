import Form from "../../shared/components/Form";
import { Field } from "react-final-form";
import { useDispatch } from "react-redux";
import { actionRequestType } from "../../store/actions/actionTypes";
import React from "react";
import Input from "../../shared/components/Input";
import validateFormValues from "../../shared/validators/ValidateFormValues";
import userRegistrationSchema from "../../shared/validators/UserRegistrationSchema";
import RenderDatePicker from "../../shared/components/DatePicker";
import DatePickerWrapper from "../../shared/components/DatePicker";

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

    const validate = validateFormValues(userRegistrationSchema);

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
                            {meta.touched && meta.error && (
                                <span className="validation-error">
                                    {meta.error}
                                </span>
                            )}
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
                            {meta.touched && meta.error && (
                                <span className="validation-error">
                                    {meta.error}
                                </span>
                            )}
                        </div>
                    )}
                />
            </div>
            <div className="form-row">
                <Field
                    name="birthday"
                    render={({ input, meta }) => (
                        <div>
                            <label className="form-label">
                                Your birthday date
                            </label>
                            <DatePickerWrapper
                                {...input}
                                initialValue={new Date(Date.now())}
                            />
                            {meta.touched && meta.error && (
                                <span className="validation-error">
                                    {meta.error}
                                </span>
                            )}
                        </div>
                    )}
                />
                <div>
                    <div>
                        <label className="form-label">Sex</label>
                    </div>
                    <div className="form-row">
                        <div className="gender-radio">
                            <Field
                                name="gender"
                                component="input"
                                type="radio"
                                value="male"
                                id="male"
                            />
                            <label htmlFor="male">Male</label>
                        </div>
                        <div className="gender-radio">
                            <Field
                                name="gender"
                                component="input"
                                type="radio"
                                value="female"
                                id="female"
                            />
                            <label htmlFor="female">Female</label>
                        </div>
                        <div className="gender-radio">
                            <Field
                                name="gender"
                                component="input"
                                type="radio"
                                value="other"
                                id="female"
                            />
                            <label htmlFor="other">Other</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-row">
                <Field
                    name="firstName"
                    render={({ input, meta }) => (
                        <div>
                            <Input
                                {...input}
                                type="text"
                                placeholder="First Name"
                            />
                            {meta.touched && meta.error && (
                                <span className="validation-error">
                                    {meta.error}
                                </span>
                            )}
                        </div>
                    )}
                />
                <Field
                    name="lastName"
                    render={({ input, meta }) => (
                        <div>
                            <Input
                                {...input}
                                type="text"
                                placeholder="Last Name"
                            />
                            {meta.touched && meta.error && (
                                <span className="validation-error">
                                    {meta.error}
                                </span>
                            )}
                        </div>
                    )}
                />
            </div>

            <div className="form-row">
                <Field
                    name="country"
                    render={({ input, meta }) => (
                        <div>
                            <Input
                                {...input}
                                type="text"
                                placeholder="Country"
                            />
                            {meta.touched && meta.error && (
                                <span className="validation-error">
                                    {meta.error}
                                </span>
                            )}
                        </div>
                    )}
                />
                <Field
                    name="city"
                    render={({ input, meta }) => (
                        <div>
                            <Input {...input} type="text" placeholder="City" />
                            {meta.touched && meta.error && (
                                <span className="validation-error">
                                    {meta.error}
                                </span>
                            )}
                        </div>
                    )}
                />
            </div>
            <div>
                <div>
                    <label className="form-label">
                        How did you know about us?
                    </label>
                </div>
                <div className="form-row">
                    <div>
                        <Field
                            name="heardFrom"
                            component="input"
                            type="checkbox"
                            value="friend"
                            id="friend"
                        />
                        <label className="form-checkbox" htmlFor="friend">
                            Friend
                        </label>
                    </div>
                    <div>
                        <Field
                            name="heardFrom"
                            component="input"
                            type="checkbox"
                            value="internet"
                            id="internet"
                        />
                        <label className="form-checkbox" htmlFor="internet">
                            Internet
                        </label>
                    </div>
                </div>
                <div className="form-row">
                    <div>
                        <Field
                            name="heardFrom"
                            component="input"
                            type="checkbox"
                            value="advertisement"
                            id="advertisement"
                        />
                        <label
                            className="form-checkbox"
                            htmlFor="advertisement"
                        >
                            Advertisement
                        </label>
                    </div>
                    <div>
                        <Field
                            name="heardFrom"
                            component="input"
                            type="checkbox"
                            value="other"
                            id="other"
                        />
                        <label className="form-checkbox" htmlFor="Other">
                            Other
                        </label>
                    </div>
                </div>
            </div>
            <Field
                name="password"
                render={({ input, meta }) => (
                    <div>
                        <Input
                            {...input}
                            type="password"
                            placeholder="Password"
                        />
                        {meta.touched && meta.error && (
                            <span className="validation-error">
                                {meta.error}
                            </span>
                        )}
                    </div>
                )}
            />
            <Field
                name="passwordConfirmation"
                render={({ input, meta }) => (
                    <div>
                        <Input
                            {...input}
                            type="password"
                            placeholder="Confirm your password"
                        />
                        {meta.touched && meta.error && (
                            <span className="validation-error">
                                {meta.error}
                            </span>
                        )}
                    </div>
                )}
            />
        </Form>
    );
}
