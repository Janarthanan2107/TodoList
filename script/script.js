'use strict';

//inputs
const titleEl = document.getElementById("title")
const submitBtn = document.getElementById("submit")
//outputs
const listContainer = document.getElementById("list-container")

//global variables
// database
// we are gonna keep updating the db so create it with let variable
let items = [
    { id: 1, title: "Buy fruits" },
    { id: 2, title: "Go to Movie" },
]
// this variable is for updating the value
let isEditing;
let itemToEdit;

//functions
// inital function
const init = () => {
    getItems(items)
    isEditing = false;
    submitBtn.innerHTML = "Add"
}

// list template
const listTemplate = (item) => {
    const { id, title } = item
    const listEl = document.createElement("div")
    listEl.classList.add("list-item")
    listEl.innerHTML = `
                        <div class="list-text">
                            ${title}
                        </div>
                        <div>
                            <button class="btn-edit" onclick="updateItem(${id})"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button class="btn-delete" onclick="deleteItem(${id})"><i class="fa-solid fa-trash"></i></button>
                        </div>`
    listContainer.appendChild(listEl)
}

// get logic will held here!
const getItems = (items) => {
    // this is will stop appending the values again and again.
    listContainer.innerHTML = ""

    if (items.length > 0) {
        // every items will iterate from the database.
        items.forEach(item => {
            // invoking the template.
            listTemplate(item)
        });
    }
}

// add logic will held here!
const addItems = (title) => {
    // create new item if the input provide something.
    const newItem = {
        id: Date.now(),
        title: title,
        // if we add more items or values in DOM need to add the keys in this also.
    }
    items.push(newItem)
}

// delete logic will held here!
const deleteItem = (id) => {
    console.log(id)

    // get the id and filter the not matching value and update it to DOM.
    items = items.filter((item) => item.id !== id)
    getItems(items)
}

// update logic will held here!
const updateItem = (id) => {
    console.log(`${id} is ready to edit`)

    // this is for knowing what we are doing add or update.
    isEditing = true;
    submitBtn.innerHTML = "Update"

    // find will provide a single value / object from an array.
    itemToEdit = items.find((item) => item.id === id);
    console.log(itemToEdit)

    // adding the value need to edit to the input
    titleEl.value = itemToEdit.title
}

//events
submitBtn.addEventListener("click", () => {
    const title = titleEl.value

    if (title) {
        if (isEditing) {
            items = items.map((item) => {
                if (item.id === itemToEdit.id) {
                    const editedItem = {
                        id: item.id,
                        title: titleEl.value,
                        // if we add more items or values in DOM need to add the keys in this also for updating.
                    }
                    // directly returning no need to push the value
                    return editedItem
                } else {
                    return item
                }
            })
            isEditing = false;
            submitBtn.innerHTML = "Add"
            itemToEdit = null
        } else {
            console.log(title)
            addItems(title)
        }

        // perform get logic to render the new item or updated which user created.
        getItems(items)
        titleEl.value = null
    } else {
        alert("Don't provide an empty data")
    }
})

//initial settings
init();