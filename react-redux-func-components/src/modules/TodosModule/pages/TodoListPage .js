import React, { useEffect, useState } from "react";
import ToDoInput from "../components/ToDoInput";
import ToDoItem from "../components/ToDoItem";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { actionRequestType } from "../../../store/actions/constants";
import { useDispatch } from "react-redux";
import { Modal, Button, Container, Typography, Box, List } from "@mui/material";
import styled from "@emotion/styled";
import ShareTodosModal from "../components/ShareTodosModal";

const TodoListPage = () => {
    const todos = useSelector((state) => state.todos);
    const currentFilter = useSelector((state) => state.currentFilter);
    const user = useSelector((state) => state.user);
    const itemsCount = todos.filter((todo) => !todo.isCompleted).length;
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const filtratedTodos = todos.filter((todo) => {
        if (currentFilter === "active") {
            return !todo.isCompleted;
        }

        if (currentFilter === "completed") {
            return todo.isCompleted;
        }

        return true;
    });

    useEffect(() => {
        dispatch({
            type: actionRequestType.GET_TODOS_REQUEST,
        });
    }, []);

    const handleLogOut = () => {
        dispatch({
            type: actionRequestType.LOGOUT_USER_REQUEST,
        });
    };

    return (
        <>
            <HeaderBlock right={"84%"}>
                <HeaderButton className="logout-button" onClick={handleOpen}>
                    Share
                </HeaderButton>
            </HeaderBlock>

            <Typography variant="h1">ToDo</Typography>
            {user ? (
                <HeaderBlock right={0}>
                    <Typography variant="h2">
                        Welcome, {user.fullName}
                    </Typography>
                    <HeaderButton
                        className="logout-button"
                        onClick={handleLogOut}
                    >
                        Log Out
                    </HeaderButton>
                </HeaderBlock>
            ) : (
                <></>
            )}

            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "50%",
                    background: "white",
                    borderRadius: "1rem",
                }}
            >
                <ToDoInput />
                <TodoBlock>
                    <TodosList className="todos-list" id="todos-list">
                        {filtratedTodos.map((item) => (
                            <ToDoItem
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                isCompleted={item.isCompleted}
                                isUpdated={item.isUpdated}
                                isAuthor={item.isAuthor}
                                author={item.author}
                            />
                        ))}
                    </TodosList>
                </TodoBlock>
                <Footer itemsCount={itemsCount} currentFilter={currentFilter} />
            </Container>
            <ShareTodosModal open={open} onClose={handleClose} />
        </>
    );
};

export default TodoListPage;

const TodoBlock = styled(Box)({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
});

const TodosList = styled(List)({
    marginTop: 5,
    width: "95%",
    listStyleType: "none",
    padding: 0,
});

const HeaderBlock = styled(Container)((props) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: "1rem",
    margin: 0,
    padding: 0,
    marginTop: "-3rem",
    position: "absolute",
    top: "3rem",
    right: props.right,
}));

const HeaderButton = styled(Button)({ width: "20%", height: "50%" });
