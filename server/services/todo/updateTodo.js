const updateTodo = async (newTodo) => {
    await makeRequest(
        `UPDATE todos SET title = ${newTodo.title}, isUpdated = TRUE WHERE id = '${todoId}';`,
    );
};

export default updateTodo;
