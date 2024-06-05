import { makeRequest } from "../../db.js";
import { v4 } from "uuid";

const addTodo = async (todo) => {
    todo.id = v4;

    await makeRequest(
        `INSERT INTO todos (id, title, isCompleted, isUpdated, userId) VALUES (${todo.id}, ${todo.title}, FALSE, FALSE, userId); `,
    );
};

const deleteTodo = async (todoId) => {
    await makeRequest(`DELETE FROM todos WHERE id = '${todoId}';`);
};

const updateTodo = async (newTodo) => {
    await makeRequest(
        `UPDATE todos SET title = ${newTodo.title}, isUpdated = TRUE WHERE id = '${todoId}';`,
    );
};

const checkTodo = async (checkedTodo) => {
    await makeRequest(
        `UPDATE todos SET isCompleted = ${checkedTodo.isCompleted} WHERE id = '${checkedTodo.id}';`,
    );
};

const clearCompleted = async () => {
    await makeRequest(`DELETE FROM todos WHERE isCompleted = TRUE;`);
};
