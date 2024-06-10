const deleteTodo = async (todoId) => {
    await makeRequest(`DELETE FROM todos WHERE id = '${todoId}';`);
};

export default deleteTodo;
