const checkTodo = async (checkedTodo) => {
    await makeRequest(
        `UPDATE todos SET isCompleted = ${checkedTodo.isCompleted} WHERE id = '${checkedTodo.id}';`,
    );
};

export default checkTodo;
