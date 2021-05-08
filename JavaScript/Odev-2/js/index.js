let TODOS = [];

const renderTodos = (todo) => {
    let list = document.querySelector("#list");

    let liElement = document.createElement("li");
    liElement.appendChild(document.createTextNode(todo.text));
    list.appendChild(liElement);
    liElement.id = todo.id;
};

const handleSubmit = () => {
    let todoInput = document.getElementById("task");
    addTodo(todoInput.value);
    todoInput.value = "";
};

const handleChecked = () => {
    const list = document.querySelector("#list");
    list.addEventListener("click", (event) => {
        event.target.classList.toggle("checked");
        TODOS.map((todo) => {
            if (todo.id == event.target.id) {
                // ==  kullanıyoruz çünkü sadece value karşılaştırması. (event.target.id string)
                todo.checked = !todo.checked;
            }
        });
    });
};

const getLocalStoreData = () => {};
const setLocalStoreData = () => {
    localStorage.setItem("Todos", JSON.stringify(TODOS));
};

const addTodo = (text) => {
    let newTodo = {
        id: TODOS.length + 1, //increment
        text,
        checked: false,
    };

    TODOS = [...TODOS, newTodo];
    renderTodos(newTodo);
};
const removeTodo = () => {};
handleChecked();
