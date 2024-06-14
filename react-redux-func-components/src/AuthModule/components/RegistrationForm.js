import Form from "../../shared/components/Form";
import { Field } from "react-final-form";
import { useDispatch } from "react-redux";
import { actionRequestType } from "../../store/actions/actionTypes";
import React from "react";
import Input from "../../shared/components/Input";
import validateFormValues from "../../shared/validators/ValidateFormValues";
import userRegistrationSchema from "../../shared/validators/UserRegistrationSchema";
import DatePickerWrapper from "../../shared/components/DatePicker";
import GenderRadioGroup from "./GenderRadioGroup";
import HeardFromMultiSelect from "./HeardFromMultiSelect";

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
                    initialValue={new Date(Date.now())}
                    labelText="Your birthday date"
                    component={DatePickerWrapper}
                />
                <Field name="gender" component={GenderRadioGroup} />
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
            <Field name="heardFrom" component={HeardFromMultiSelect} />
            <Field name="password" inputType="password" component={Input} />
            <Field
                name="passwordConfirmation"
                inputType="password"
                component={Input}
            />
        </Form>
    );
}
