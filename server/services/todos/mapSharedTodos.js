const mapSharedTodos = async (todos) =>
    todos.flatMap((ownerObj) => {
        const { owner } = ownerObj;

        if (owner.todo.id) {
            return { ...owner.todo, author: owner.fullName, isAuthor: false };
        }
        return [];
    });

export default mapSharedTodos;
