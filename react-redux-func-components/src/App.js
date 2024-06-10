import { Route, Routes } from "react-router-dom";
import "./App.css";
import TodoListPage from "./pages/TodoListPage ";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import withAuth from "./components/withAuth";
import { useToast } from "./components/toast/toast-context";

function App() {
    const LoginWithAuth = withAuth(LoginPage, false);
    const RegisterWithAuth = withAuth(RegisterPage, false);
    const TodoListWithAuth = withAuth(TodoListPage, true);

    const toast = useToast();

    toast.open("This is toast message");

    return (
        <Routes>
            <Route path="/login" element={<LoginWithAuth />} />
            <Route path="/register" element={<RegisterWithAuth />} />
            <Route path="/" element={<TodoListWithAuth />} />
        </Routes>
    );
}

export default App;
