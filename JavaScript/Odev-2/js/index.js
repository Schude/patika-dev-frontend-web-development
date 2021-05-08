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

        var span = document.createElement("span");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.onclick = removeTodo;
        span.appendChild(txt);
        liElement.appendChild(span);
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

// getLocalStoreData();
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
    //checking whitespaces or empty
    text = text.replace(/^\s+/, "").replace(/\s+$/, "");
    if (text === "" || text === " ") {
        $(".error").toast("show");
    } else {
        let newTodo = {
            id: Date.now(), //unique ID
            text,
            checked: false,
        };
        TODOS = [...TODOS, newTodo];
        setLocalStoreData();
        $(".success").toast("show");
        renderTodos();
    }
};

const removeTodo = () => {
    let list = document.querySelector("#list");
    list.addEventListener("click", (event) => {
        TODOS = TODOS.filter((todo) => todo.id != event.target.parentNode.id);
        renderTodos();
        setLocalStoreData();
    });
    $(".remove").toast("show");
};

createLocalStore();
TODOS = getLocalStoreData();
renderTodos();
handleChecked();
