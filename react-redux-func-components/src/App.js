import { Route, Routes } from "react-router-dom";
import "./App.css";
import { withAuth } from "./shared/utils/HOCs";
import { RegistrationPage } from "./modules/AuthModule/pages";
import { LoginPage } from "./modules/AuthModule/pages";
import { TodoListPage } from "./modules/TodosModule/pages";

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
