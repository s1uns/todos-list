import { Route, Routes } from "react-router-dom";
import "./App.css";
import TodoListPage from "./pages/TodoListPage ";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import withAuth from "./components/withAuth";

function App() {
    const LoginWithAuth = withAuth(LoginPage, false);
    const RegisterWithAuth = withAuth(RegisterPage, false);
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
