//get html
const addButton = document.getElementById("add-button");
const resultSection = document.getElementById("result-section");
const listContainer = document.getElementById("list-container");
const listInput = document.getElementById("list-input");
const clearButton = document.getElementById("clear-button");

//initial render
renderList();

// functions
//add a list item
function addFunction(text) {
    const trimedText = text.trim();
    if (!localStorage.bazarList) {
        const listArray = [];
        listArray.push(text);
        const listString = JSON.stringify(listArray);
        localStorage.bazarList = listString;
        renderList();
    } else {
        let listString = localStorage.bazarList;
        const listArray = JSON.parse(listString);
        //check the localstorage item is array
        if (Array.isArray(listArray)) {
            // check if already exists
            if (listArray.indexOf(trimedText) === -1) {
                listArray.unshift(trimedText);
                listString = JSON.stringify(listArray);
                localStorage.bazarList = listString;
                renderList();
            } else {
                alert("item already exists");
                return false;
            }
        } else {
            alert("something went wrong!!");
            return false;
        }
    }
}

// render list item
function renderList() {
    if (localStorage.bazarList) {
        resultSection.style.display = "block";
        listContainer.innerHTML = null;
        const listArray = JSON.parse(localStorage.bazarList);
        listArray.forEach((element) => {
            const LI = document.createElement("LI");
            LI.setAttribute("class", "list-item-box");
            const SPAN = document.createElement("SPAN");
            SPAN.textContent = element;
            const BUTTON = document.createElement("BUTTON");
            BUTTON.setAttribute("class", "btn delete-button");
            BUTTON.setAttribute("onclick", "deleteItem(event)");
            // BUTTON.textContent = "delete";
            LI.appendChild(SPAN);
            LI.appendChild(BUTTON);
            listContainer.appendChild(LI);
        });
    } else {
        resultSection.style.display = "none";
    }
}

// delete item
function deleteItem(event) {
    event.target.parentNode.remove();
    const deleteItem = event.target.previousSibling.textContent.trim();
    const listArray = JSON.parse(localStorage.bazarList);
    const deleteIndex = listArray.indexOf(deleteItem);
    if (deleteIndex > -1) {
        listArray.splice(deleteIndex, 1);
        if (listArray.length > 0) {
            localStorage.bazarList = JSON.stringify(listArray);
        } else {
            localStorage.removeItem("bazarList");
            renderList();
        }
    }
}

//event listener
listInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        addButton.click();
    }
});

//add items
addButton.addEventListener("click", () => {
    const listItem = listInput.value.trim();
    if (listItem !== "") {
        addFunction(listItem);
        listInput.value = null;
    } else {
        alert("list item is empty");
        return false;
    }
});

//clear list
clearButton.addEventListener("click", () => {
    const isConfirmed = window.confirm("are you sure to clear the list?");
    if (isConfirmed) {
        localStorage.removeItem("bazarList");
        renderList();
    }
});
