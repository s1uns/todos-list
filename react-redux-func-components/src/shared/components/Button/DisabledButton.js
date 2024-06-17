import { Button, styled } from "@mui/material";
import React from "react";

const StyledButton = styled(Button)({
    "&:hover": {
        cursor: "not-allowed",
    },
});

export default function DisabledButton() {
    return <StyledButton>Disabled</StyledButton>;
}
