const mapOwnTodos = async (todos) =>
    todos.map((todo) => {
        const { creator, ...todoInfo } = todo;
        const fullName = `${creator.firstName[0]} ${creator.lastName[0]}`;

        return { ...todoInfo, author: fullName, isAuthor: true };
    });

export default mapOwnTodos;
