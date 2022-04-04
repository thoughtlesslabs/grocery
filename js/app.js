const addItemButton = document.querySelectorAll('button.item-button');
const task = document.querySelectorAll('input.task-item');
const quant = document.querySelectorAll('input.task-quant');
const items = document.querySelectorAll("div.all-items")

// Take input from text box and store in database
function addItem() {
    if ( this.parentElement.parentElement.parentElement.parentElement.querySelector('.task-item').value !== "" && this.parentElement.parentElement.parentElement.parentElement.querySelector('.task-quant').value !== "") {
        const newDiv = this.parentElement.parentElement.parentElement.parentElement.cloneNode(true);
        const delButton = newDiv.querySelector('.item-button')
        delButton.addEventListener("click", deleteItem);
        delButton.classList.remove("btn-success");
        delButton.classList.add("btn-outline-danger");
        delButton.innerText = "Delete";

        const disableEdit = newDiv.querySelectorAll('input');
        for ( let item of disableEdit ) {
            item.disabled = true;
        }

        // Add edit button
        const editButton = document.createElement('button')
        editButton.classList.add('btn', 'btn-warning', 'item-button');
        editButton.innerText = "Edit";
        editButton.type = "button";
        editButton.addEventListener("click", editItem);
        newDiv.querySelector('.action-buttons').prepend(editButton);

        // Add new div to bottom of list
        this.parentElement.parentElement.parentElement.parentElement.parentElement.append(newDiv);

        // Reset entry field
        this.parentElement.parentElement.parentElement.nextElementSibling.value = "";
        this.parentElement.parentElement.parentElement.nextElementSibling.nextElementSibling.value = "";
    }
}

// Remove item from list
function deleteItem() {
    // loop through all items so we can delete all?
    this.parentElement.parentElement.parentElement.parentElement.remove();
}

function editItem() {
    this.classList.remove('btn-warning');
    this.classList.add('btn-outline-success');
    this.innerText = "Save";
    this.addEventListener("click", saveItem);
    this.parentElement.parentElement.parentElement.parentElement.querySelector('.task-quant').disabled = false;
    this.parentElement.parentElement.parentElement.parentElement.querySelector('.task-item').disabled = false;
}

function saveItem() {
    this.classList.remove('btn-outline-success');
    this.classList.add('btn-warning');
    this.innerText = "Edit";
    this.removeEventListener('click', saveItem)
    this.addEventListener("click", editItem);
    this.parentElement.parentElement.parentElement.parentElement.querySelector('.task-quant').disabled = true;
    this.parentElement.parentElement.parentElement.parentElement.querySelector('.task-item').disabled = true;
}

// Draw a line through item indicating completion
function completeItem() {

}

for ( let button of addItemButton) {
    button.addEventListener("click", addItem);
}

window.addEventListener("keypress", function (e) {
    if ( e.key === 'Enter' ) {
        addItem();
        console.log(e);
    }
});
