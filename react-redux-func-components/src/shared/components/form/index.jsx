import { Form as FinalForm } from "react-final-form";

const Form = ({ submitBtnName, onSubmit, validate, children }) => (
    <FinalForm
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
                {children}
                <button className="form-button" type="submit">
                    {submitBtnName}
                </button>
            </form>
        )}
    />
);

export default Form;
