import "./index.css";
import React from "react";
import { useSelector } from "react-redux";
import Toast from "./Toast";
import { Container, styled } from "@mui/material";

const StyledContainer = styled(Container)({
    position: "fixed",
    top: "1rem",
    right: "-20rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    zIndex: 10000,
    width: "100%",
});

const ToastsList = () => {
    const toasts = useSelector((state) => state.toasts);

    return (
        <StyledContainer>
            {toasts.length
                ? toasts.map((toast) => (
                      <Toast
                          key={toast.id}
                          id={toast.id}
                          message={toast.message}
                      />
                  ))
                : ""}
        </StyledContainer>
    );
};

export default ToastsList;
