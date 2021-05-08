let TODOS = [];

const renderTodos = () => {
    resetList();
    TODOS.map((todo) => {
        let list = document.querySelector("#list");

        let liElement = document.createElement("li");
        liElement.appendChild(document.createTextNode(todo.text));
        if (todo.checked) {
            liElement.classList.toggle("checked");
        }
        list.appendChild(liElement);
        liElement.id = todo.id;
    });
};
const resetList = () => {
    let list = document.querySelector("#list");
    let liDOM = document.querySelectorAll("li");
    liDOM.forEach((element) => {
        list.removeChild(element);
    });
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
                // ==  kullanıyoruz çünkü sadece value karşılaştırması. (event.target.id - string)
                todo.checked = !todo.checked;
            }
        });
        setLocalStoreData(); //Checked olduğunda LocalStore update ediliyor
    });
};

const getLocalStoreData = () => JSON.parse(localStorage.getItem("Todos"));

getLocalStoreData();
const setLocalStoreData = () => {
    localStorage.setItem("Todos", JSON.stringify(TODOS));
};

//Eğer kullanıcı ilk defa giriyorsa localStore'da bir boş array oluşturuyoruz.
const createLocalStore = () => {
    if (getLocalStoreData() === null) {
        localStorage.setItem("Todos", JSON.stringify([]));
    }
};
const addTodo = (text) => {
    let newTodo = {
        id: Date.now(), //unique
        text,
        checked: false,
    };

    TODOS = [...TODOS, newTodo];
    setLocalStoreData();
    renderTodos(newTodo);
};
const removeTodo = () => {};

createLocalStore();
TODOS = getLocalStoreData();
renderTodos();
handleChecked();
