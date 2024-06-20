const mapSharedTodos = async (todos) =>
    todos.flatMap((ownerObj) => {
        const { owner } = ownerObj;
        const fullName = `${owner.firstName[0]} ${owner.lastName[0]}`;

        if (owner.todo.id) {
            return { ...owner.todo, author: fullName, isAuthor: false };
        }
        return [];
    });

export default mapSharedTodos;
