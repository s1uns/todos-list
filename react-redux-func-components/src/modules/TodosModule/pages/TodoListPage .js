import React, { useEffect, useState } from "react";
import ToDoInput from "../components/ToDoInput";
import ToDoItem from "../components/ToDoItem";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { actionRequestType } from "../../../store/actions/constants";
import { useDispatch } from "react-redux";
import {
    Button,
    Container,
    Typography,
    Box,
    List,
    Pagination,
} from "@mui/material";
import styled from "@emotion/styled";
import ShareTodosModal from "../components/ShareTodosModal";
import {
    getTodosRequest,
    setPageRequest,
} from "../../../store/actions/todosActions";
import { logoutUserRequest } from "../../../store/actions/authActions";
import {
    FILTER_ACTIVE,
    FILTER_COMPLETED,
    TODOS_LIMIT,
} from "../../../shared/constants";

const TodoListPage = () => {
    const dispatch = useDispatch();

    const currentFilter = useSelector((state) => state.currentFilter);
    const {
        list: todos,
        count,
        currentPage,
    } = useSelector((state) => state.todos);
    const user = useSelector((state) => state.user);

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        dispatch(getTodosRequest({ currentPage: currentPage }));
    }, []);

    const changePage = (newPage) => {
        dispatch(setPageRequest(newPage));
    };

    const handleChangePage = (event, newPage) => {
        changePage(newPage);
    };

    const handleLogOut = () => {
        dispatch(logoutUserRequest());
    };

    const filtratedTodos = todos.filter((todo) => {
        if (currentFilter === FILTER_ACTIVE) {
            return !todo.isCompleted;
        }

        if (currentFilter === FILTER_COMPLETED) {
            return todo.isCompleted;
        }

        return true;
    });

    // const filtratedTodos = useMemo(
    //     () =>
    //         todos.filter((todo) => {
    //             if (currentFilter === "active") {
    //                 return !todo.isCompleted;
    //             }

    //             if (currentFilter === "completed") {
    //                 return todo.isCompleted;
    //             }

    //             return true;
    //         }),
    //     [currentFilter],
    // );

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
                <StyledPagination
                    size="large"
                    count={Math.ceil(count / TODOS_LIMIT)}
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

const StyledPagination = styled(Pagination)({
    marginTop: "1rem",
    marginBottom: ".1rem",
});

const HeaderButton = styled(Button)({ width: "20%", height: "50%" });
