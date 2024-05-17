const todoInput = document.getElementById("add-todo");
const todosList = document.getElementById("todos-list");
const todosCounter = document.getElementById("counter");
const allFilterBtn = document.getElementById("all-btn");
const activeFilterBtn = document.getElementById("active-btn");
const completedFilterBtn = document.getElementById("completed-btn");
const clearCompletedBtn = document.getElementById("clear-btn");
let todosArray = [];
let currentFilter = "all";


allFilterBtn.addEventListener("click", (e) => setFilter(e, "all"));

activeFilterBtn.addEventListener("click", (e) => setFilter(e, "active"));

completedFilterBtn.addEventListener("click", (e) => setFilter(e, "completed"));

clearCompletedBtn.addEventListener("click", () => {
    todosArray = todosArray.filter((todo) => !todo.isCompleted);
    updateData();
});

todoInput.addEventListener("keypress", createTodo);

function setFilter(e, string) {
    clearButtonsClasses();
    currentFilter = string;
    e.target.classList.add("active");
    updateData();
}

function updateData() {
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
}

function createTodo(e) {
    if (e.key === "Enter") {
        if (todoInput.value.length == 0) {
            alert("Enter something first!");
            return;
        }

        todosArray.push({
            id: todosArray.length + 1,
            title: todoInput.value,
            isCompleted: false,
            isUpdated: false,
        });

        todoInput.value = "";
        updateData();
    }
}

function createTodoElement(todo) {
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
}

function checkTodo(e) {
    const todo = todosArray.find(
        (item) => item.id == e.target.parentElement.id
    );
    todo.isCompleted = !todo.isCompleted;
    updateData();
}

function deleteTodo(e) {
    const todo = e.target.parentElement;
    todosArray = todosArray.filter((item) => item.id != todo.id);
    updateData();
}

function updateTodo(e) {
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
}

function changeTodoTitle(e, id) {
    const todo = todosArray.find((item) => item.id == id);
    todo.title = e.target.value;
    todo.isUpdated = true;
    updateData();
}

function clearButtonsClasses() {
    allFilterBtn.classList.remove("active");
    activeFilterBtn.classList.remove("active");
    completedFilterBtn.classList.remove("active");
}
