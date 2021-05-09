const section = document.querySelector(".section-center");
const buttonContainer = document.querySelector(".btn-container");

getCategories = () => {
    let categories = ["All"];
    menu.map((item) => {
        if (!categories.includes(item.category)) {
            categories = [...categories, item.category];
        }
    });
    return categories;
};

createNavigateButtons = (categories) => {
    let navButtons = categories.map((category) => {
        let btn = document.createElement("button");
        btn.classList.add("btn", "btn-item", "btn-outline-dark");
        let textNode = document.createTextNode(category);
        btn.appendChild(textNode);
        btn.id = category;
        buttonContainer.appendChild(btn);
        return btn;
    });
    return navButtons;
};

createMenuItemContent = (menu) => {
    menu.map((item) => {
        let img = document.createElement("img"); //1.
        img.classList.add("photo");
        img.src = item.img;
        img.alt = item.title;

        let itemData = document.createElement("div"); //1.
        itemData.classList.add("menu-info");

        let itemTitle = document.createElement("div");
        itemTitle.classList.add("menu-title");
        itemData.appendChild(itemTitle);

        let itemDesc = document.createElement("div");
        itemDesc.classList.add("menu-text");
        let itemDescTextNode = document.createTextNode(item.desc);
        itemDesc.appendChild(itemDescTextNode);
        itemData.appendChild(itemDesc);

        let titleEle = document.createElement("h4");
        let titleTextNode = document.createTextNode(item.title);
        titleEle.appendChild(titleTextNode);
        itemTitle.appendChild(titleEle);

        let priceEle = document.createElement("h4");
        priceEle.classList.add("price");
        let priceTextNode = document.createTextNode(item.price);
        priceEle.appendChild(priceTextNode);
        itemTitle.appendChild(priceEle);

        let itemDOM = document.createElement("div");
        itemDOM.classList.add("menu-items", "col-lg-6", "col-sm-12");
        itemDOM.appendChild(img);
        itemDOM.appendChild(itemData);
        section.appendChild(itemDOM);
    });
};

handleNavButtons = (buttons) => {
    buttons.map((button) => {
        button.addEventListener("click", (event) => {
            let activeCategory = event.target.id;
            let qwe = menu.filter((item) => item.category == activeCategory);
            if (event.target.id === "All") {
                qwe = menu;
            }
            resetContent();
            createMenuItemContent(qwe);
        });
    });
};

resetContent = () => {
    let menuItem = document.querySelectorAll(".section-center > div");
    menuItem.forEach((element) => {
        section.removeChild(element);
    });
};
const categories = getCategories();
const navButtons = createNavigateButtons(categories);
createMenuItemContent(menu);
handleNavButtons(navButtons);
