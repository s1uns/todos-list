import Form from "../../shared/components/Form";
import { useDispatch } from "react-redux";
import { actionRequestType } from "../../store/actions/actionTypes";
import React from "react";
import { mapToField } from "../../shared/utils/helpers";
import authMapper from "../mappers/authMapper";
import validateFormValues from "../../shared/validators/ValidateFormValues";
import { userRegistrationSchema } from "../../shared/validators";

const fields = [
    {
        name: "email",
        type: "text",
        placeholder: "Email",
        componentType: "input",
    },
    {
        name: "password",
        type: "password",
        placeholder: "Password",
        componentType: "input",
    },
];
export default function LoginForm() {
    //MUI TEXT-FIELD - INPUT,
    const dispatch = useDispatch();

    const handleLogin = (values) => {
        const { email, password } = values;
        dispatch({
            type: actionRequestType.LOGIN_USER_REQUEST,
            payload: {
                email: email,
                password: password,
            },
        });
    };

    const validate = validateFormValues(userRegistrationSchema);

    return (
        <Form
            submitBtnName={"Login"}
            onSubmit={handleLogin}
            validate={validate}
        >
            {fields.map((field) => mapToField(field, authMapper))}
        </Form>
    );
}
