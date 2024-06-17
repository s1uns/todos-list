import { styled } from "@mui/material";
import React from "react";
import { Button as MuiButton } from "@mui/material";
import { green } from "@mui/material/colors";

const StyledButton = styled(MuiButton)({
    width: "calc(100% - 2rem)",
    padding: "1rem",
    border: "none",
    borderRadius: " 0.5rem",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "2rem",
    cursor: "pointer",
    marginTop: "1rem",

    "&:hover": {
        backgroundColor: "#009bf3",
    },
});

export default function Button(props) {
    return <StyledButton {...props}>{props.children}</StyledButton>;
}
