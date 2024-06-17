import { TextField, styled } from "@mui/material";

const StyledInput = styled(TextField)({
    margin: 3,
    "& .MuiInputLabel-root:not(.MuiInputLabel-shrink)": {
        transform: "translate(14px, 8px) scale(1)",
    },
    "& .MuiInputLabel-root": {
        color: "green",
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: "purple",
    },
    "& .MuiInputBase-input": {
        width: "100%",
        padding: 8,
    },
});

export default StyledInput;
