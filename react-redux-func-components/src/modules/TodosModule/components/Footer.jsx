import React from "react";
import { useDispatch } from "react-redux";
import { actionRequestType } from "../../../store/actions/actionTypes";
import { Box, Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/material";

const FooterButton = styled(Button)({
    height: "3rem",
    fontSize: "1rem",
    color: "black",
    backgroundColor: "white",
    border: "0.1rem solid transparent",
    width: "100%",
    transition: "all ease-in 0.3s",

    "&:hover": {
        border: "0.1rem solid black",
        backgroundColor: "white",
    },

    "&.active": {
        border: "0.1rem solid black",
    },
});

const Footer = ({ itemsCount, currentFilter }) => {
    const dispatch = useDispatch();

    const setFilter = (filter) => {
        dispatch({
            type: actionRequestType.SET_FILTER_REQUEST,
            payload: filter,
        });
    };

    const clearCompleted = () => {
        dispatch({ type: actionRequestType.CLEAR_COMPLETED_REQUEST });
    };
    return (
        <Container
            sx={{
                fontSize: "3rem",
                marginBottom: "1rem",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
            }}
        >
            <Typography id="counter" style={{ fontSize: "2.5rem" }}>
                {itemsCount} items left
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
                <FooterButton
                    id="all-btn"
                    className={currentFilter === "all" ? "active" : ""}
                    onClick={() => setFilter("all")}
                >
                    All
                </FooterButton>
                <FooterButton
                    id="active-btn"
                    className={currentFilter === "active" ? "active" : ""}
                    onClick={() => setFilter("active")}
                >
                    Active
                </FooterButton>
                <FooterButton
                    id="completed-btn"
                    className={currentFilter === "completed" ? "active" : ""}
                    onClick={() => setFilter("completed")}
                >
                    Completed
                </FooterButton>
                <FooterButton
                    sx={{ marginLeft: 2 }}
                    id="clear-btn"
                    onClick={clearCompleted}
                >
                    Clear completed
                </FooterButton>
            </Box>
        </Container>
    );
};

export default Footer;
