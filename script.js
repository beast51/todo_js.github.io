let todoList = getTodoFromLS();

const input = document.querySelector(".todo__input");
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && input.value.trim() !== '') {
    todoList.push({ 
      id : Date.now(),
      text: input.value,
      completed: false
    });
    input.value = "";
    renderTodoItem(todoList);
    saveTodoToLS();
  }
});

function renderTodoItem(array) {
  const out = document.querySelector(".todo-out__items");
  const outTitle = document.querySelector('.todo-out__title');
  outTitle.innerHTML = `${todoList.length > 0 ? 'Список дел:' : 'Запланируй что-то)'}`
  out.innerHTML = "";
  array.forEach(
    (item) =>
      (out.innerHTML += `
      <li class="todo-out__item item">
      <label class="item-input">
          <input 
          class="item-input__checkbox" 
          type="checkbox" id=${item.id} 
          ${ item.completed ? "checked" : "" }
          />
          <span class="item-input__text">${item.text}<span> 
      </label>
      <button onClick={deleteTodoItem(event)} class="item-input__button" id=${item.id }>Удалить</button> 
    </li>
    `)
  );
}

function deleteTodoItem(event) {
  todoList = todoList.filter(item => item.id != event.target.id);
  saveTodoToLS();
  renderTodoItem(todoList);
}

function saveTodoToLS() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

function getTodoFromLS() {
  if (JSON.parse(localStorage.getItem("todoList")) === null) {
    return [];
  }
  return JSON.parse(localStorage.getItem("todoList"));
}

renderTodoItem(todoList);
