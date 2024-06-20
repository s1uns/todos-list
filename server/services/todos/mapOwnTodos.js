const mapOwnTodos = async (todos) =>
    todos.map((todo) => {
        const { creator, ...todoInfo } = todo;
        const fullName = `${creator.firstName} ${creator.lastName}`;

        return { ...todoInfo, fullName: fullName, isAuthor: true };
    });

export default mapOwnTodos;
