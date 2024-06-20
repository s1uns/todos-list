const mapSharedTodos = async (todos) =>
    todos.map((ownerObj) => {
        const { owner } = ownerObj;
        const fullName = `${owner.firstName} ${owner.lastName}`;

        return { ...owner.todo, fullName: fullName, isAuthor: false };
    });

export default mapSharedTodos;
