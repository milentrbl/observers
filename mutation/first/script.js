// задачи
const todos = [
    {
      id: "1",
      text: "Learn HTML",
    },
    {
      id: "2",
      text: "Learn CSS",
    },
    {
      id: "3",
      text: "Learn JavaScript",
    },
    {
      id: "4",
      text: "Stay alive",
    },
];
  
  // шаблон элемента списка
const Item = (todo) => `
  <li class="item" id="${todo.id}"> 
    <span class="text">${todo.text}</span>
    <button class="btn danger" data-type="delete">Delete</button>
  </li>
`;

// общий шаблон
const Template = `
  <form id="form" class="form">
      <input type="text" class="input" id="input">
      <button class="btn" data-type="add">Add</button>
  </form>
  <ul id="list" class="list">
      ${todos.reduce(
        (html, todo) =>
          (html += `
            ${Item(todo)}
          `),
        ""
      )}
  </ul>
`;

// оборачиваем код в IIFE
(() => {
    // вставляем шаблон в контейнер с идентификатором "box"
    box.innerHTML = `
    <h1 id="counter" class="counter">
    ${todos.length} todo(s) left
    </h1>
    ${Template}
`;
  
    // фокусируемся на поле для ввода текста
    input.focus();
  
    // создаем экземпляр MutationObserver
    const observer = new MutationObserver(() => {
      // получаем количество задач в списке
      const count = todos.length;
  
      // сообщаем либо о том, сколько задач осталось, либо о том, что задач не осталось
      counter.textContent = `
      ${count > 0 ? `${count} todo(s) left` : "There are no todos"}
    `;
    });
  
    // начинаем наблюдать за списком и его дочерними элементами
    observer.observe(list, {
      childList: true,
    });
  
    // функция добавления новой задачи в список
    const addTodo = () => {
      if (!input.value.trim()) return;
  
      const todo = {
        id: Date.now().toString().slice(-4),
        text: input.value,
      };
  
      list.insertAdjacentHTML("beforeend", Item(todo));
  
      todos.push(todo);
  
      input.value = "";
      input.focus();
    };
  
    // функция удаления задачи из списка
    const deleteTodo = (item) => {
      const index = todos.findIndex((todo) => todo.id === item.id);
  
      item.remove();
  
      todos.splice(index, 1);
    };
  
    // отключаем обработку отправки формы браузером
    form.onsubmit = (e) => e.preventDefault();
  
    // обрабатываем нажатие кнопок
    box.addEventListener("click", (e) => {
      if (e.target.tagName !== "BUTTON") return;
  
      // получаем тип кнопки и элемент списка
      const { type } = e.target.dataset;
      const item = e.target.parentElement;
  
      // в зависимости от типа кнопки вызываем ту или иную функцию
      switch (type) {
        case "add":
          addTodo();
          break;
        default:
          deleteTodo(item);
          break;
      }
    });
  })();