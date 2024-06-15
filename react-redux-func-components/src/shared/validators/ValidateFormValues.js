import { setIn } from "final-form";

const validateFormValues = (schema) => async (values) => {
    console.log("Values: ", values);

    if (typeof schema === "function") {
        schema = schema();
    }
    try {
        await schema.validate(values, { abortEarly: false });
    } catch (err) {
        const errors = err.inner.reduce((formError, innerError) => {
            return setIn(formError, innerError.path, innerError.message);
        }, {});

        return errors;
    }
};

export default validateFormValues;
