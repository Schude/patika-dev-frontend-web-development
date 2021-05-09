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
        let btn = createElement(
            "button",
            ["btn", "btn-item", "btn-outline-dark"],
            category
        );

        btn.id = category;
        buttonContainer.appendChild(btn);
        return btn;
    });
    return navButtons;
};

renderMenuItems = (menu) => {
    menu.map((item) => {
        //Main Item
        let itemDOM = createElement("div", [
            "menu-items",
            "col-lg-6",
            "col-sm-12",
        ]);

        //Main Item's ChildNodes
        let img = createElement("img", ["photo"]);
        //Adding img attributes
        img.src = item.img;
        img.alt = item.title;
        let itemData = createElement("div", ["menu-info"]);

        //ItemData's ChildNodes
        let itemTitle = createElement("div", ["menu-title"]);
        let itemDesc = createElement("div", ["menu-text"], item.desc);

        //ItemTitle's ChildNodes
        let titleEle = createElement("h4", ["item-title"], item.title);
        let priceEle = createElement("h4", ["price"], item.price);

        //Adding ItemTitle's ChildNodes
        itemTitle.appendChild(titleEle);
        itemTitle.appendChild(priceEle);

        //Adding ItemData's ChildNodes
        itemData.appendChild(itemTitle);
        itemData.appendChild(itemDesc);

        //Adding Main's ChildNodes
        itemDOM.appendChild(img);
        itemDOM.appendChild(itemData);

        //Adding Container's ChildNodes
        section.appendChild(itemDOM);
    });
};

handleNavButtons = (buttons) => {
    buttons.map((button) => {
        button.addEventListener("click", (event) => {
            let activeCategory = event.target.id;
            let activeCategoryMenu = menu.filter(
                (item) => item.category == activeCategory
            );
            if (event.target.id === "All") {
                activeCategoryMenu = menu;
            }
            resetContent();
            renderMenuItems(activeCategoryMenu);
        });
    });
};

resetContent = () => {
    let menuItem = document.querySelectorAll(".section-center > div");
    menuItem.forEach((element) => {
        section.removeChild(element);
    });
};
createElement = (elem, className, text = "") => {
    let el = document.createElement(elem);
    el.classList.add(...className);
    let textNode = document.createTextNode(text);
    el.appendChild(textNode);

    return el;
};
const categories = getCategories();
const navButtons = createNavigateButtons(categories);
renderMenuItems(menu);
handleNavButtons(navButtons);