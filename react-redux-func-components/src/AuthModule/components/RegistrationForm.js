import Form from "../../shared/components/Form";
import { Field } from "react-final-form";
import { useDispatch } from "react-redux";
import { actionRequestType } from "../../store/actions/actionTypes";
import React from "react";
import Input from "../../shared/components/Input";
import validateFormValues from "../../shared/validators/ValidateFormValues";
import userRegistrationSchema from "../../shared/validators/UserRegistrationSchema";
import DatePickerWrapper from "../../shared/components/DatePicker";

export default function RegistrationForm() {
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
                    placeholder="Email"
                    inputType="text"
                    component={Input}
                />
            </div>
            <div>
                <Field
                    name="username"
                    placeholder="Username"
                    inputType="text"
                    component={Input}
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
                        <label className="form-label">Gender</label>
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
                    placeholder="First Name"
                    inputType="text"
                    component={Input}
                />
                <Field
                    name="lastName"
                    placeholder="Last Name"
                    inputType="text"
                    component={Input}
                />
            </div>

            <div className="form-row">
                <Field
                    name="country"
                    inputType="text"
                    placeholder="Country"
                    component={Input}
                />
                <Field
                    name="city"
                    inputType="text"
                    placeholder="City"
                    component={Input}
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
            <Field name="password" inputType="password" component={Input} />
            <Field
                name="passwordConfirmation"
                inputType="password"
                component={Input}
            />
        </Form>
    );
}
