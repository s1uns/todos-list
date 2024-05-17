const todoInput = document.getElementById("add-todo");
const todosList = document.getElementById("todos-list");
const todosCounter = document.getElementById("counter");
const allFilterBtn = document.getElementById("all-btn");
const activeFilterBtn = document.getElementById("active-btn");
const completedFilterBtn = document.getElementById("completed-btn");
const clearCompletedBtn = document.getElementById("clear-btn");
const storage = localStorage.getItem("todos");
let todosArray = storage ? JSON.parse(storage) : [];
let currentFilter = "all";


const setFilter = (e, string) => {
    clearButtonsClasses();
    currentFilter = string;
    e.target.classList.add("active");
    updateData();
};

const updateData = () => {
    localStorage.setItem("todos", JSON.stringify(todosArray));
    todosList.innerHTML = "";
    const filteredArray = todosArray.filter((item) => {
        if (currentFilter === "active") {
            return !item.isCompleted;
        }

        if (currentFilter === "completed") {
            return item.isCompleted;
        }
        return true;
    });

    filteredArray.forEach((item) => createTodoElement(item));

    todosCounter.innerText = `${
        todosArray.filter((todo) => !todo.isCompleted).length
    } items left`;
};

const createTodo = (e) => {
    if (e.key === "Enter") {
        const trimmedString = todoInput.value.trim();

        if (trimmedString.length == 0) {
            alert("Enter something first!");
            return;
        }

        todosArray.push({
            id: todosArray.length + 1,
            title: trimmedString,
            isCompleted: false,
            isUpdated: false,
        });

        todoInput.value = "";
        updateData();
    }
};

const createTodoElement = (todo) => {
    const todoElement = document.createElement("li");
    todoElement.id = todo.id;
    todoElement.classList.add("todo-item");
    if (todo.isCompleted) {
        todoElement.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.isCompleted;
    checkbox.classList.add("chek-todo-btn");

    const todoTitle = document.createElement("span");
    todoTitle.innerHTML = todo.title;
    todoTitle.classList.add("todo-title");

    const updatedIcon = document.createElement("span");
    updatedIcon.innerHTML = todo.isUpdated ? "🖊" : "";
    updatedIcon.classList.add("updated-icon");

    const deleteTodoBtn = document.createElement("p");
    deleteTodoBtn.innerHTML = "✖️";
    deleteTodoBtn.classList.add("delete-btn");

    todoElement.append(checkbox);
    todoElement.append(todoTitle);
    todoElement.append(updatedIcon);
    todoElement.append(deleteTodoBtn);

    todosList.append(todoElement);

    todoElement.addEventListener("dblclick", updateTodo);
    checkbox.addEventListener("change", checkTodo);
    deleteTodoBtn.addEventListener("click", deleteTodo);
};

const checkTodo = (e) => {
    const todo = todosArray.find(
        (item) => item.id == e.target.parentElement.id
    );
    todo.isCompleted = !todo.isCompleted;
    updateData();
};

const deleteTodo = (e) => {
    const todo = e.target.parentElement;
    todosArray = todosArray.filter((item) => item.id != todo.id);
    updateData();
};

const updateTodo = (e) => {
    if (e.target.classList.contains("todo-title")) {
        const todoOldTitle = e.target;
        const todoInput = document.createElement("input");
        const todo = todoOldTitle.parentElement;
        todoInput.value = todoOldTitle.innerHTML;
        todoInput.classList.add("update-todo-input");
        todoOldTitle.replaceWith(todoInput);
        todoInput.focus();
        todoInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                changeTodoTitle(e, todo.id);
            }
        });
    }
};

const changeTodoTitle = (e, id) => {
    const trimmedString = e.target.value.trim();

    if (trimmedString.length == 0) {
        alert("Enter something first!");
        return;
    }

    const todo = todosArray.find((item) => item.id == id);
    todo.title = e.target.value;
    todo.isUpdated = true;
    updateData();
};

const clearButtonsClasses = () => {
    allFilterBtn.classList.remove("active");
    activeFilterBtn.classList.remove("active");
    completedFilterBtn.classList.remove("active");
};

allFilterBtn.addEventListener("click", (e) => setFilter(e, "all"));

activeFilterBtn.addEventListener("click", (e) => setFilter(e, "active"));

completedFilterBtn.addEventListener("click", (e) => setFilter(e, "completed"));

clearCompletedBtn.addEventListener("click", () => {
    todosArray = todosArray.filter((todo) => !todo.isCompleted);
    updateData();
});

todoInput.addEventListener("keypress", createTodo);

updateData();