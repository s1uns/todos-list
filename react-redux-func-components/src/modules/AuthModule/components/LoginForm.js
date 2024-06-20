import { useDispatch } from "react-redux";
import { actionRequestType } from "../../../store/actions/constants";
import React from "react";
import { mapToField } from "../../../shared/utils/helpers";
import authMapper from "../mappers/authMapper";
import validateFormValues from "../../../shared/validators/ValidateFormValues";
import { userLoginSchema } from "../../../shared/validators";
import { Form } from "../../../shared/components/Form";
import { loginUserRequest } from "../../../store/actions/authActions";

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
const LoginForm = () => {
    const dispatch = useDispatch();

    const handleLogin = (values) => {
        const { email, password } = values;

        dispatch(
            loginUserRequest({
                email: email,
                password: password,
            })
        );

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
};

export default LoginForm;
