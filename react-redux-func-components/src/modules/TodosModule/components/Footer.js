import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/material";
import { setFilterRequest } from "../../../store/actions/filterActions";
import { clearCompletedRequest } from "../../../store/actions/todosActions";
import { FILTER_ACTIVE, FILTER_ALL, FILTER_COMPLETED } from "../../../shared/constants";

const Footer = ({ currentFilter, onClearCompleted }) => {
    const dispatch = useDispatch();
    
    const { count } = useSelector((state) => state.todos);

    const setFilter = (filter) => {
        dispatch(setFilterRequest(filter));
    };

    const clearCompleted = () => {
        dispatch(clearCompletedRequest());
        onClearCompleted();
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
                {count} items left
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
                <FooterButton
                    id="all-btn"
                    className={currentFilter === FILTER_ALL ? "active" : ""}
                    onClick={() => setFilter(FILTER_ALL)}
                >
                    All
                </FooterButton>
                <FooterButton
                    id="active-btn"
                    className={currentFilter === FILTER_ACTIVE ? "active" : ""}
                    onClick={() => setFilter(FILTER_ACTIVE)}
                >
                    Active
                </FooterButton>
                <FooterButton
                    id="completed-btn"
                    className={currentFilter === FILTER_COMPLETED ? "active" : ""}
                    onClick={() => setFilter(FILTER_COMPLETED)}
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
