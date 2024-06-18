import "./index.css";
import React from "react";
import { useDispatch } from "react-redux";
import { useTimeout } from "../../utils/hooks";
import { actionRequestType } from "../../../store/actions/actionTypes";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { Box, Typography } from "@mui/material";

const Toast = ({ id, message }) => {
    const dispatch = useDispatch();

    const handleCloseToast = () =>
        dispatch({
            type: actionRequestType.DISMISS_NOTIFICATION_REQUEST,
            payload: id,
        });

    useTimeout(handleCloseToast, 3000);

    return (
        <StyledToast>
            <Typography sx={{ fontSize: "2rem", padding: 2 }}>
                {message}
            </Typography>
            <CloseButton onClick={handleCloseToast}>{"\u274c"}</CloseButton>
        </StyledToast>
    );
};

export default Toast;

const slideIn = keyframes`
  0% {
    transform: translateX(100%);
  }
  60% {
    transform: translateX(-15%);
  }
  80% {
    transform: translateX(5%);
  }
  100% {
    transform: translateX(0);
  }
`;

const StyledToast = styled(Box)`
    position: fixed;
    top: 1rem;
    right: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    z-index: 10000;

    background-color: rgb(242, 242, 156);
    font-size: 3rem;
    color: black;
    border-radius: 0.5rem;
    padding: 0 1rem;
    width: 30rem;
    position: relative;
    box-shadow: 0 0.3rem 0.2rem 0.2rem black;
    animation: ${slideIn} 0.35s;
`;

const CloseButton = styled("button")`
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: none;
    cursor: pointer;
`;
