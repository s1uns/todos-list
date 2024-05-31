import { Route, Routes } from "react-router-dom";
import "./App.css";
import TodoListPage from "./pages/TodoListPage ";
import LoginPage from "./pages/LoginPage";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<TodoListPage />} />
        </Routes>
    );
}

export default App;
