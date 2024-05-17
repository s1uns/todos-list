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
    loadData();
};

const loadData = () => {
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
    updateCounter();
};

const updateCounter = () => {
    todosCounter.innerText = `${
        todosArray.filter((todo) => !todo.isCompleted).length
    } items left`;
};

const createTodo = (e) => {
    if (e.key === "Enter") {
        const trimmedString = todoInput.value.trim();
        const lastId = todosArray.length
            ? todosArray[todosArray.length - 1].id
            : 0;

        if (trimmedString.length == 0) {
            alert("Enter something first!");
            return;
        }

        const todo = {
            id: lastId + 1,
            title: trimmedString,
            isCompleted: false,
            isUpdated: false,
        };

        todosArray.push(todo);

        todoInput.value = "";
        createTodoElement(todo);
        saveToLocalStorage();
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

    const deleteTodoBtn = document.createElement("p");
    deleteTodoBtn.innerHTML = "✖️";
    deleteTodoBtn.classList.add("delete-btn");

    const updatedIcon = document.createElement("span");
    updatedIcon.innerHTML = todo.isUpdated ? "🖊" : "";
    updatedIcon.classList.add("updated-icon");

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

    const todoElement = [...todosList.querySelectorAll(".todo-item")].find(
        (item) => item.id == todo.id
    );

    todo.isCompleted = !todo.isCompleted;
    saveToLocalStorage();

    if (todo.isCompleted) {
        todoElement.classList.add("completed");
    } else {
        todoElement.classList.remove("completed");
    }
};

const deleteTodo = (e) => {
    const todo = e.target.parentElement;
    todosArray = todosArray.filter((item) => item.id != todo.id);
    todo.remove();
    saveToLocalStorage();
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
    const todoInput = e.target;
    if (trimmedString.length == 0) {
        alert("Enter something first!");
        return;
    }

    const todo = todosArray.find((item) => item.id == id);

    const todoElement = [...todosList.querySelectorAll(".todo-item")].find(
        (item) => item.id == todo.id
    );

    const wasUpdated = todo.isUpdated;
    const todoNewTitle = document.createElement("span");
    todoNewTitle.innerHTML = todoInput.value;

    if (todo.title != todoInput.value) {
        todo.title = e.target.value;
        todo.isUpdated = true;
        saveToLocalStorage();
    }

    if (todo.isUpdated && !wasUpdated) {
        const updatedIcon = document.createElement("span");
        updatedIcon.innerHTML = todo.isUpdated ? "🖊" : "";
        updatedIcon.classList.add("updated-icon");

        todoElement.append(updatedIcon);
    }

    todoNewTitle.classList.add("todo-title");

    todoInput.replaceWith(todoNewTitle);
    todoElement.addEventListener("dblclick", updateTodo);
};

const clearButtonsClasses = () => {
    allFilterBtn.classList.remove("active");
    activeFilterBtn.classList.remove("active");
    completedFilterBtn.classList.remove("active");
};

const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todosArray));
    updateCounter();
};

allFilterBtn.addEventListener("click", (e) => setFilter(e, "all"));

activeFilterBtn.addEventListener("click", (e) => setFilter(e, "active"));

completedFilterBtn.addEventListener("click", (e) => setFilter(e, "completed"));

clearCompletedBtn.addEventListener("click", () => {
    todosArray = todosArray.filter((todo) => !todo.isCompleted);
    loadData();
});

todoInput.addEventListener("keypress", createTodo);

loadData();
