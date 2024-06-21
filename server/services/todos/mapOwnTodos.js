const mapOwnTodos = async (todos) =>
    todos.map((todo) => {
        const { creator, ...todoInfo } = todo;
        
        return { ...todoInfo, author: creator.fullName, isAuthor: true };
    });

export default mapOwnTodos;
