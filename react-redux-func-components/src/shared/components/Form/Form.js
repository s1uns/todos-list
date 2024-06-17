import { Form as FinalForm } from "react-final-form";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";

const Form = (props) => {
    const { submitBtnName, onSubmit, validate, children } = props;

    return (
        <FinalForm
            onSubmit={onSubmit}
            validate={validate}
            render={({ handleSubmit }) => (
                <form
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    
                    onSubmit={handleSubmit}
                >
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
