import { useDispatch } from "react-redux";
import { actionRequestType } from "../../store/actions/actionTypes";
import React from "react";
import { mapToField } from "../../shared/utils/helpers";
import authMapper from "../mappers/authMapper";
import validateFormValues from "../../shared/validators/ValidateFormValues";
import { userLoginSchema } from "../../shared/validators";
import { Form } from "../../shared/components/Form";

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

        return;
    };

    const validate = validateFormValues(userLoginSchema);

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
