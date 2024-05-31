import { Route, Routes } from "react-router-dom";
import "./App.css";
import TodoListPage from "./pages/TodoListPage ";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<TodoListPage />} />
        </Routes>
    );
}

export default App;
