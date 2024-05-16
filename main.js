let body = document.body;
let todoInput = document.getElementById("add-todo");
let todosList = document.getElementById("todos-list");
let todosCounter = document.getElementById("counter");
let todosArray = [];

todoInput.addEventListener("keypress", createTodo);

function updateData() {
    todosList.innerHTML = todosArray.map((todo) => todo.outerHTML);
    let checkBtns = document.querySelectorAll(".chek-todo-btn");
    checkBtns.forEach((checkBtn) => {
        checkBtn.addEventListener("change", checkTodo);
    });

    let deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach((deleteBtn) => {
        deleteBtn.addEventListener("click", deleteTodo);
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
        checkbox.checked = true;
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
        updateData();
        todoInput.value = "";
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
    todosCounter.innerText = `${todosArray.length} items`;
}
