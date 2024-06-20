const mapSharedTodos = async (todos) =>
    todos.flatMap((ownerObj) => {
        const { owner } = ownerObj;
        const fullName = `${owner.firstName} ${owner.lastName}`;

        if (owner.todo.id) {
            return { ...owner.todo, author: fullName, isAuthor: false };
        }
        return [];
    });

export default mapSharedTodos;
