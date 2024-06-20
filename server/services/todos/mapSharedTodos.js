const mapSharedTodos = async (todos) =>
    todos.map((ownerObj) => {
        const { owner } = ownerObj;
        const fullName = `${owner.firstName[0]} ${owner.lastName[0]}`;

        return { ...owner.todo, author: fullName, isAuthor: false };
    });

export default mapSharedTodos;
