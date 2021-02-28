let todoList = getTodoFromLS();

const input = document.querySelector(".todo__input");
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && input.value.trim() !== '') {
    todoList.push({
      id: Date.now(),
      text: input.value,
      completed: false,
      edit: false
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
          ${item.completed ? "checked" : ""}
          />
          ${!item.edit ?
        `<span ondblclick={editTodoTextOn(event)} class="item-input__text">${item.text}<span> `
        :
        `<input onblur={editTodoTextOff(event)} class="item-input__input" value="${item.text}"/> `}
      </label>
      <button onClick={deleteTodoItem(event)} class="item-input__button" id=${item.id}>Удалить</button> 
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

function editTodoTextOn(event) {
  todoList.forEach(item => {
    if (item.id == event.target.previousElementSibling.id) {
      item.edit = !item.edit;
      saveTodoToLS();
      renderTodoItem(todoList);
      document.querySelector('.item-input__input').focus();
      document.querySelector('.item-input__input').onkeydown = function(event) {
        if (event.key == 'Enter') {
          this.blur();
        }
      };
    };
  });
}

function editTodoTextOff(event) {
  if (document.querySelector(".item-input__input").value.trim() !== '') {
    todoList.forEach(item => {
      if (item.id == event.target.previousElementSibling.id) {
        item.text = document.querySelector(".item-input__input").value;
        item.edit = !item.edit;
      }
    });
    saveTodoToLS();
    renderTodoItem(todoList);
  } else {
    todoList.forEach(item => {
      if (item.id == event.target.previousElementSibling.id) {
        item.edit = !item.edit;
      }
    });
    saveTodoToLS();
    renderTodoItem(todoList);
  }
}

renderTodoItem(todoList);
