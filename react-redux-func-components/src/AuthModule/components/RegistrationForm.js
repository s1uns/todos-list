import { Form } from "../../shared/components/Form";
import { useDispatch } from "react-redux";
import { actionRequestType } from "../../store/actions/actionTypes";
import React from "react";
import validateFormValues from "../../shared/validators/ValidateFormValues";
import { mapToField } from "../../shared/utils/helpers";
import { userRegistrationSchema } from "../../shared/validators";
import authMapper from "../mappers/authMapper";
import { Paper } from "@mui/material";

const topFullRows = [
    {
        name: "email",
        type: "text",
        placeholder: "Email",
        componentType: "input",
    },
    {
        name: "username",
        type: "text",
        placeholder: "Username",
        componentType: "input",
    },
];

const halfRows = [
    {
        firstField: {
            name: "firstName",
            type: "text",
            placeholder: "First Name",
            componentType: "input",
        },
        secondField: {
            name: "lastName",
            type: "text",
            placeholder: "Last Name",
            componentType: "input",
        },
    },
    {
        firstField: {
            name: "birthday",
            placeholder: "Your birthday date",
            componentType: "datePicker",
        },
        secondField: {
            name: "gender",
            placeholder: "Your sex",
            type: "radio",
            componentType: "gender",
        },
    },
    {
        firstField: {
            name: "country",
            type: "text",
            placeholder: "Country",
            componentType: "input",
        },
        secondField: {
            name: "city",
            type: "text",
            placeholder: "City",
            componentType: "input",
        },
    },
];

const bottomFullRows = [
    {
        name: "heardFrom",
        type: "checkbox",
        componentType: "heardFrom",
    },
    {
        name: "password",
        type: "password",
        placeholder: "Password",
        componentType: "input",
    },
    {
        name: "passwordConfirmation",
        type: "password",
        placeholder: "Confirm password",
        componentType: "input",
    },
];

export default function RegistrationForm() {
    const dispatch = useDispatch();

    const handleRegister = (values) => {
        const { email, firstName, lastName, username, password } = values;

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
    };

    const validate = validateFormValues(userRegistrationSchema);

    return (
        <Form
            submitBtnName={"Register"}
            onSubmit={handleRegister}
            validate={validate}
        >
            {topFullRows.map((field) => mapToField(field, authMapper))}

            {halfRows.map((row) => {
                return (
                    <div className="form-row">
                        {mapToField(row.firstField, authMapper)}
                        {mapToField(row.secondField, authMapper)}
                    </div>
                );
            })}

            {bottomFullRows.map((field) => mapToField(field, authMapper))}
        </Form>
    );
}
