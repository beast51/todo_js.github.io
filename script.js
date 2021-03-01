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
      <label class="item-input" ondblclick={editTodoTextOn(event)}>
          <input 
          class="item-input__checkbox" 
          type="checkbox" id=${item.id} 
          ${item.completed ? "checked" : ""}
          />
          ${!item.edit ?
        `<span  class="item-input__text">${item.text}<span> `
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

const getInputText = () => document.querySelector('.item-input__input')

function editTodoTextOn(event) {
  console.log(event);
  todoList.forEach(item => {
    if (item.id == event.srcElement.control.id) {

      item.edit = !item.edit;
      saveTodoToLS();
      renderTodoItem(todoList);

      getInputText().focus();
      getInputText().onkeydown = function (event) {
        if (event.key == 'Enter') {
          this.blur();
        }
      };
    }
  });
}

function editTodoTextOff(event) {
  todoList.forEach(item => {
    if (item.id == event.target.previousElementSibling.id) {
      if (getInputText().value.trim() !== '') {
        item.text = getInputText().value;
        item.edit = !item.edit;
      } else {
        item.edit = !item.edit;
      }
    }
  });
  saveTodoToLS();
  renderTodoItem(todoList);
}

renderTodoItem(todoList);
