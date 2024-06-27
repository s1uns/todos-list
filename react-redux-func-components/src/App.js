import { Route, Routes } from "react-router-dom";
import "./App.css";
import { withAuth } from "./shared/utils/HOCs";
import { RegistrationPage } from "./modules/AuthModule/pages";
import { LoginPage } from "./modules/AuthModule/pages";
import { TodoListPage } from "./modules/TodosModule/pages";
import { useDispatch } from "react-redux";
import { connectionRefreshAction } from "./notifications/notificationActions";
import { useEffect } from "react";

function App() {
    const LoginWithAuth = withAuth(LoginPage, false);
    const RegisterWithAuth = withAuth(RegistrationPage, false);
    const TodoListWithAuth = withAuth(TodoListPage, true);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(connectionRefreshAction());
    }, []);
    // emit refresh page, if user is in store, connect to the socket

    return (
        <Routes>
            <Route path="/login" element={<LoginWithAuth />} />
            <Route path="/registration" element={<RegisterWithAuth />} />
            <Route path="/" element={<TodoListWithAuth />} />
        </Routes>
    );
}

export default App;
