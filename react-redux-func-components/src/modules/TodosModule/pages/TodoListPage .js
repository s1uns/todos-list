import React, { useEffect } from "react";
import ToDoInput from "../components/ToDoInput";
import ToDoItem from "../components/ToDoItem";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { actionRequestType } from "../../../store/actions/actionTypes";
import { useDispatch } from "react-redux";
import { Button, Container, Typography } from "@mui/material";

const TodoListPage = () => {
    const todos = useSelector((state) => state.todos);
    const currentFilter = useSelector((state) => state.currentFilter);
    const user = useSelector((state) => state.user);
    const itemsCount = todos.filter((todo) => !todo.isCompleted).length;
    const dispatch = useDispatch();
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
            <Typography variant="h1">ToDo</Typography>
            {user ? (
                <Container
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "1rem",
                        marginTop: "-3rem",
                    }}
                >
                    <Typography variant="h2">
                        Welcome, {user.fullName}
                    </Typography>
                    <Button
                        sx={{ width: "20%", height: "50%" }}
                        className="logout-button"
                        onClick={handleLogOut}
                    >
                        Log Out
                    </Button>
                </Container>
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
                <div className="todos-block">
                    <ul className="todos-list" id="todos-list">
                        {filtratedTodos.map((item) => (
                            <ToDoItem
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                isCompleted={item.isCompleted}
                                isUpdated={item.isUpdated}
                            />
                        ))}
                    </ul>
                </div>
                <Footer itemsCount={itemsCount} currentFilter={currentFilter} />
            </Container>
        </>
    );
};

export default TodoListPage;
