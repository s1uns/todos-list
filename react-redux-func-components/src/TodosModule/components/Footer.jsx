import React from "react";
import { useDispatch } from "react-redux";
import { actionRequestType } from "../../store/actions/actionTypes";
import { Box, Button, Container } from "@mui/material";
import { styled } from "@mui/material";

const FooterButton = styled(Button)({
    height: "3rem",
    color: "black",
    backgroundColor: "white",
    border: "none",
    border: "0.1rem solid transparent",
    transition: "all ease-in 0.3s",
    padding: ".01rem",
    "&.active": {
        border: "0.1rem solid black",
    },
});

export default function Footer({ itemsCount, currentFilter }) {
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
                justifyContent: "space-around",
                alignItems: "flex-end",
            }}
        >
            <span id="counter" style={{ fontSize: "2rem" }}>
                {itemsCount} items left
            </span>
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
            </Box>
            <FooterButton id="clear-btn" onClick={clearCompleted}>
                Clear completed
            </FooterButton>
        </Container>
    );
}
