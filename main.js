let todoInput = document.getElementById("add-todo");
let todosList = document.getElementById("todos-list");
let todosCounter = document.getElementById("counter");
let todosArray = [];
const filters = ["all", "active", "completed"];
let allFilterBtn = document.getElementById("all-btn");
let activeFilterBtn = document.getElementById("all-btn");
let completedFilterBtn = document.getElementById("all-btn");

todoInput.addEventListener("keypress", createTodo);

function updateData() {
    todosArray.forEach((todo) => {
        todosList.append(todo);
    });

    todosCounter.innerText = `${todosArray.length} items`;
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
}

function deleteTodo(e) {
    let todo = e.target.parentElement;
    todosArray = todosArray.filter((item) => item.id != todo.id);
    todo.remove();
    updateData();
}
