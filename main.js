let todoInput = document.getElementById("add-todo");
let todosList = document.getElementById("todos-list");
let todosCounter = document.getElementById("counter");
let todosArray = [];
let currentFilter = "all";
let allFilterBtn = document.getElementById("all-btn");
let activeFilterBtn = document.getElementById("active-btn");
let completedFilterBtn = document.getElementById("completed-btn");
let clearCompletedBtn = document.getElementById("clear-btn");

allFilterBtn.addEventListener("click", (e) => setFilter(e, "all"));

activeFilterBtn.addEventListener("click", (e) => setFilter(e, "active"));

completedFilterBtn.addEventListener("click", (e) => setFilter(e, "completed"));

clearCompletedBtn.addEventListener("click", () => {
    todosArray = todosArray.filter((todo) => !todo.isCompleted);
    updateData();
});

function setFilter(e, string) {
    clearButtonsClasses();
    currentFilter = string;
    e.target.classList.add("active");
    updateData();
}

todoInput.addEventListener("keypress", createTodo);

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

    // todosList.innerHTML = filteredArray.map(
    //     (item) => createTodoElement(item).outerHTML
    // );

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
    let todoElement = document.createElement("li");
    todoElement.id = todo.id;
    todoElement.classList.add("todo-item");
    if (todo.isCompleted) {
        todoElement.classList.add("completed");
    }

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.isCompleted;
    checkbox.classList.add("chek-todo-btn");

    let todoTitle = document.createElement("span");
    todoTitle.innerHTML = todo.title;
    todoTitle.classList.add("todo-title");

    let updatedIcon = document.createElement("span");
    updatedIcon.innerHTML = todo.isUpdated ? "🖊" : "";
    updatedIcon.classList.add("updated-icon");

    let deleteTodoBtn = document.createElement("p");
    deleteTodoBtn.innerHTML = "✖️";
    deleteTodoBtn.classList.add("delete-btn");

    todosList.append(todoElement);
    todoElement.append(checkbox);
    todoElement.append(todoTitle);
    todoElement.append(updatedIcon);
    todoElement.append(deleteTodoBtn);

    todosList.append(todoElement);

    todoElement.addEventListener("dblclick", updateTodo);
    checkbox.addEventListener("change", checkTodo);
    deleteTodoBtn.addEventListener("click", deleteTodo);
}

//TODO: fix ID issue
function checkTodo(e) {
    todosArray[e.target.parentElement.id - 1].isCompleted =
        !todosArray[e.target.parentElement.id - 1].isCompleted;
    updateData();
}

function deleteTodo(e) {
    let todo = e.target.parentElement;
    todosArray = todosArray.filter((item) => item.id != todo.id);
    todo.remove();
    updateData();
}

function updateTodo(e) {
    if (e.target.classList.contains("todo-title")) {
        let todoOldTitle = e.target;
        let todoInput = document.createElement("input");
        let todo = todoOldTitle.parentElement;
        todoInput.value = todoOldTitle.innerHTML;
        todoInput.classList.add("update-todo-input");
        todoOldTitle.replaceWith(todoInput);
        todoInput.focus();
        todoInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                changeTodoTitle(e, todo);
            }
        });
    }
}

//TODO: fix ID issue
function changeTodoTitle(e, todo) {
    let todoInput = e.target;
    let todoNewTitle = document.createElement("span");
    todoNewTitle.innerHTML = todoInput.value;
    todoNewTitle.classList.add("todo-title");
    todosArray[todo.id - 1].title = todoNewTitle.innerText;
    todosArray[todo.id - 1].isUpdated = true;
    todoInput.replaceWith(todoNewTitle);
    updateData();
}

function clearButtonsClasses() {
    allFilterBtn.classList.remove("active");
    activeFilterBtn.classList.remove("active");
    completedFilterBtn.classList.remove("active");
}
