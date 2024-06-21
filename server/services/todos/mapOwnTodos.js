const mapOwnTodos = async (todos) =>
    todos.map((todo) => {
        const { creator, ...todoInfo } = todo;
        console.log("Creator: ", creator);
        const fullName = `${creator.firstName[0]} ${creator.lastName[0]}`;

        return { ...todoInfo, author: creator.fullName, isAuthor: true };
    });

export default mapOwnTodos;
