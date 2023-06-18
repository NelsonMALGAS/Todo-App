const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');

todoForm.addEventListener('submit', addTodo);

function addTodo (event) {
    event.preventDefault();

    const titleInput = document.getElementById('title-input');
    const dueDateInput = document.getElementById('due-date-input');
    const urgencyInput = document.getElementById('urgency-input');

    const title = titleInput.value;
    const dueDate = dueDateInput.value;
    const urgency = urgencyInput.value;
    const currentDate = new Date().toISOString().split('T')[0];

    if (isDuplicateTitle(title)) {
        alert('Todo with the same title already exists!');
        return;
    }

    const todoItem = document.createElement('li');
    todoItem.innerHTML = `
        <span class="todo-details">${title} - Due: ${dueDate}</span>
        <span class="todo-urgency ${urgency}-urgency">${urgency.toUpperCase()}</span>
        <span class="todo-current-date">Created: ${currentDate}</span>
        <button class="delete-button">Delete</button>
        <button class="edit-button">Edit</button>
    `;

    const deleteButton = todoItem.querySelector('.delete-button');
    deleteButton.addEventListener('click', deleteTodo);

    const editButton = todoItem.querySelector('.edit-button');
    editButton.addEventListener('click', editTodo);

    todoList.appendChild(todoItem);

    titleInput.value = '';
    dueDateInput.value = '';
    urgencyInput.selectedIndex = 0;
}

function deleteTodo() {
    const todoItem = this.parentNode;
    todoList.removeChild(todoItem);
}

function editTodo() {
    const todoItem = this.parentNode;
    const todoDetails = todoItem.querySelector('.todo-details');

    const title = prompt('Enter new title:');
    if (title !== null && title !== '') {
        if (isDuplicateTitle(title)) {
            alert('Todo with the same title already exists!');
            return;
        }
        todoDetails.innerText = title + ' - Due: ' + todoDetails.innerText.split(' - Due: ')[1];
    }
}

function isDuplicateTitle(title) {
    const todoItems = todoList.getElementsByTagName('li');
    for (let i = 0; i < todoItems.length; i++) {
        const todoDetails = todoItems[i].querySelector('.todo-details');
        if (todoDetails.innerText.startsWith(title + ' -')) {
            return true;
        }
    }
    return false;
}
