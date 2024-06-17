import { Form as FinalForm } from "react-final-form";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material";

const Form = (props) => {
    const { submitBtnName, onSubmit, validate, children } = props;

    return (
        <Paper>
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
        </Paper>
    );
};

const StyledForm = styled(Form)({
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
});

export default StyledForm;
