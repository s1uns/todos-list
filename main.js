let todoInput = document.getElementById("add-todo");
let todosList = document.getElementById("todos-list");
let todosCounter = document.getElementById("counter");
let todosArray = [];
let currentFilter = "all";
let allFilterBtn = document.getElementById("all-btn");
let activeFilterBtn = document.getElementById("active-btn");
let completedFilterBtn = document.getElementById("completed-btn");
let clearCompletedBtn = document.getElementById("clear-btn");

allFilterBtn.addEventListener("click", () => {
    clearButtonsClasses();
    currentFilter = "all";
    allFilterBtn.classList.add("active");
    updateData();
});

activeFilterBtn.addEventListener("click", () => {
    clearButtonsClasses();
    currentFilter = "active";
    activeFilterBtn.classList.add("active");
    updateData();
});

completedFilterBtn.addEventListener("click", () => {
    clearButtonsClasses();
    currentFilter = "completed";
    completedFilterBtn.classList.add("active");
    updateData();
});

clearCompletedBtn.addEventListener("click", () => {
    todosArray = todosArray.filter(
        (todo) => !todo.classList.contains("completed")
    );
    updateData();
});

todoInput.addEventListener("keypress", createTodo);

function updateData() {
    while (todosList.firstChild) todosList.removeChild(todosList.firstChild);

    switch (currentFilter) {
        case "all":
            todosArray.forEach((todo) => {
                todosList.append(todo);
            });
            break;

        case "active":
            todosArray
                .filter((todo) => !todo.classList.contains("completed"))
                .forEach((todo) => {
                    todosList.append(todo);
                });
            break;

        case "completed":
            todosArray
                .filter((todo) => todo.classList.contains("completed"))
                .forEach((todo) => {
                    todosList.append(todo);
                });
            break;

        default:
            alert("Wrong filter!");
            break;
    }

    todosCounter.innerText = `${
        todosArray.filter((todo) => !todo.classList.contains("completed"))
            .length
    } items left`;
}

function createTodo(e) {
    if (e.key === "Enter") {
        if (todoInput.value.length == 0) {
            alert("Enter something first!");
            return;
        }

        let todo = document.createElement("li");
        todo.id = todosArray.length + 1;
        todo.classList.add("todo-item");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = false;
        checkbox.classList.add("chek-todo-btn");

        let todoTitle = document.createElement("span");
        todoTitle.innerHTML = todoInput.value;
        todoTitle.classList.add("todo-title");

        let deleteTodoBtn = document.createElement("p");
        deleteTodoBtn.innerHTML = "✖️";
        deleteTodoBtn.classList.add("delete-btn");

        todo.append(checkbox);
        todo.append(todoTitle);
        todo.append(deleteTodoBtn);
        todosArray.push(todo);
        todosList.append(todo);

        todo.addEventListener("dblclick", updateTodo);
        checkbox.addEventListener("change", checkTodo);
        deleteTodoBtn.addEventListener("click", deleteTodo);
        todoInput.value = "";
        updateData();
    }
}

function checkTodo(e) {
    if (e.target.checked) {
        e.target.parentElement.classList.add("completed");
    } else {
        e.target.parentElement.classList.remove("completed");
    }
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

function changeTodoTitle(e, todo) {
    let todoInput = e.target;
    let todoNewTitle = document.createElement("span");
    todoNewTitle.innerHTML = todoInput.value;
    todoNewTitle.classList.add("todo-title");
    todosArray[todo.id - 1].getElementsByClassName("todo-title").innerHTML =
        todoNewTitle;
    todoInput.replaceWith(todoNewTitle);
    updateData();
}

function clearButtonsClasses() {
    allFilterBtn.classList.remove("active");
    activeFilterBtn.classList.remove("active");
    completedFilterBtn.classList.remove("active");
}
