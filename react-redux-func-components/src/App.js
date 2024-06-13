import { Route, Routes } from "react-router-dom";
import "./App.css";
import TodoListPage from "./TodosModule/pages/TodoListPage ";
import withAuth from "./shared/components/withAuth";
import LoginPage from "./AuthModule/pages/LoginPage";
import RegistrationPage from "./AuthModule/pages/RegistrationPage";

function App() {
    const LoginWithAuth = withAuth(LoginPage, false);
    const RegisterWithAuth = withAuth(RegistrationPage, false);
    const TodoListWithAuth = withAuth(TodoListPage, true);

    return (
        <Routes>
            <Route path="/login" element={<LoginWithAuth />} />
            <Route path="/registration" element={<RegisterWithAuth />} />
            <Route path="/" element={<TodoListWithAuth />} />
        </Routes>
    );
}

export default App;
