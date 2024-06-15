import { Form as FinalForm } from "react-final-form";

const Form = (props) => {
    const { submitBtnName, onSubmit, validate, children } = props;
    console.log("Props: ", props);

    return (
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
};

export default Form;
