import React, { useEffect, useState, useMemo } from "react";
import ToDoInput from "../components/ToDoInput";
import ToDoItem from "../components/ToDoItem";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
    Button,
    Container,
    Typography,
    Box,
    List,
    Pagination,
    Table,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import styled from "@emotion/styled";
import ShareTodosModal from "../components/ShareTodosModal";
import { getTodosRequest } from "../../../store/actions/todosActions";
import { logoutUserRequest } from "../../../store/actions/authActions";
import { setQueryRequest } from "../../../store/actions/queryActions";
import { SOCKET_ACTION, TODOS_LIMIT } from "../../../shared/constants";
import socket from "../../../notifications/socket";
import { setCurrentPageRequest } from "../../../store/actions/queryActions";
import {
    authAction,
    logoutAction,
} from "../../../notifications/notificationActions";

const TodoListPage = () => {
    const dispatch = useDispatch();

    const { currentPage, currentFilter } = useSelector((state) => state.query);
    const { list: todos, totalTodos } = useSelector((state) => state.todos);
    const user = useSelector((state) => state.user);

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const totalPages = useMemo(
        () => Math.ceil(totalTodos / TODOS_LIMIT),
        [todos, currentFilter],
    );

    useEffect(() => {
        dispatch(
            getTodosRequest({
                currentPage: currentPage,
                currentFilter: currentFilter,
            }),
        );
    }, [currentPage, currentFilter]);

    const changePage = (newPage) => {
        dispatch(
            setQueryRequest({
                currentPage: newPage,
                currentFilter: currentFilter,
            }),
        );
    };

    const handleChangePage = (event, newPage) => {
        changePage(newPage);
    };

    const handleLogOut = () => {
        dispatch(logoutUserRequest());
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
                    <TodosList>
                        {todos
                            .map((item) => (
                                <ToDoItem
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    isCompleted={item.isCompleted}
                                    isUpdated={item.isUpdated}
                                    author={item.author}
                                    creatorId={item.creatorId}
                                />
                            ))
                            .slice(0, 4)}
                    </TodosList>
                </TodoBlock>
                <StyledPagination
                    size="large"
                    count={totalPages}
                    page={currentPage}
                    variant="outlined"
                    shape="rounded"
                    onChange={handleChangePage}
                />
                <Footer
                    currentFilter={currentFilter}
                    onClearCompleted={() => changePage(1)}
                />
            </Container>
            <ShareTodosModal open={open} onClose={handleClose} />
        </>
    );
};

// reddis userId -> socketId
// on create todo -> check all shared users and emit the event to notify all the shared users
// on logout remove the id

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

const StyledPagination = styled(Pagination)({
    marginTop: "1rem",
    marginBottom: ".1rem",
});

const HeaderButton = styled(Button)({ width: "20%", height: "50%" });
