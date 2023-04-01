const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

let todos = [];

function saveToLocalStorage(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getFromLocalStorage() {
  const todosJSON = localStorage.getItem("todos");
  if (todosJSON !== null) {
    return JSON.parse(todosJSON);
  } else {
    return [];
  }
}

function deleteTodoFromLocalStorage(todoText) {
  const todoIndex = todos.findIndex(function(todo) {
    return todo.text === todoText;
  });
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
}

function toggleTodoFromLocalStorage(todoText) {
  const todo = todos.find(function(todo) {
    return todo.text === todoText;
  });
  if (todo !== undefined) {
    todo.done = !todo.done;
  }
}

function renderTodos(todos) {
  todoList.innerHTML = "";

  todos.forEach(function(todo) {
    const todoItem = document.createElement("li");

    const todoTextSpan = document.createElement("span");
    todoTextSpan.textContent = todo.text;
    if (todo.done) {
      todoTextSpan.classList.add("done");
    }

    const todoDeleteButton = document.createElement("button");
    todoDeleteButton.textContent = "Done";
    todoDeleteButton.classList.add("delete-button");
    
    todoItem.appendChild(todoTextSpan);
    todoItem.appendChild(todoDeleteButton);
    todoList.appendChild(todoItem);
  });
}

todoForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const todoText = todoInput.value.trim();

  if (todoText !== "") {
    todos.push({ text: todoText, done: false });
    saveToLocalStorage(todos);
    renderTodos(todos);
    todoInput.value = "";
  }
});

todoList.addEventListener("click", function(event) {
  if (event.target.classList.contains("delete-button")) {
    const todoText = event.target.previousElementSibling.textContent;
    deleteTodoFromLocalStorage(todoText);
    renderTodos(todos);
  } else {
    const todoText = event.target.textContent;
    toggleTodoFromLocalStorage(todoText);
    renderTodos(todos);
  }
});

todos = getFromLocalStorage();
renderTodos(todos);
