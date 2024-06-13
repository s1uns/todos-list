import Form from "../../shared/components/form";
import { Field } from "react-final-form";
import { useDispatch } from "react-redux";
import { actionRequestType } from "../../store/actions/actionTypes";
import React from "react";
import Input from "../../shared/components/form/input";
import Error from "../../shared/components/form/error";

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

    const validate = (values) => {
        const { email, password } = values;
        const errors = {};

        if (!email) {
            errors.email = "Required";
        }

        if (!password) {
            errors.password = "Required";
        }

        return errors;
    };

    return (
        <Form
            submitBtnName={"Login"}
            onSubmit={handleLogin}
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
                                <Error error={meta.error} />
                            )}
                        </div>
                    )}
                />
            </div>
            <div>
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
                                <Error error={meta.error} />
                            )}
                        </div>
                    )}
                />
            </div>
        </Form>
    );
}
