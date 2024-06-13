import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

const userRegistrationSchema = yup.object().shape({
    email: yup
        .string()
        .email("The email should be in corresponding format")
        .required("The email is required."),

    username: yup.string().required("The username is required."),
    firstName: yup.string().required("The first name is required."),
    lastName: yup.string().required("The last name is required."),
    birthday: yup
        .date()
        .required("The birthday date is required.")
        .min("1900-01-01", "You are too old for this s.")
        .max(new Date(Date.now()), "You are too young for this s. "),
    location: yup.object().shape({
        country: string()
            .default(null)
            .nullable()
            .test((value) => value === null || value),
        state: string()
            .default(null)
            .nullable()
            .test((value) => value === null || value),
        city: string()
            .default(null)
            .nullable()
            .test((value) => value === null || value),
    }),
    gender: yup.string().required("Your gender is required."),
    heardFrom: yup.array().required("Choose at least one source."),
    password: yup
        .string()
        .min(
            8,
            "password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special",
        )
        .minLowercase(1, "password must contain at least 1 lower case letter")
        .minUppercase(1, "password must contain at least 1 upper case letter")
        .minNumbers(1, "password must contain at least 1 number")
        .minSymbols(1, "password must contain at least 1 special character"),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords mismatch."),
});

export default userRegistrationSchema;
