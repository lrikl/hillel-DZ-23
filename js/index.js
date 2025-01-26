'use strict';

const todoList = document.querySelector('.todo-list');
const todoInput = document.getElementById('todo-main-input');
const todoBlock = document.querySelector('.todo-block');
const deleteButtonAll = document.getElementById('del-allbtn');

todoBlock.addEventListener('click', (event) => {
    const target = event.target;

    if (target.id === 'add-todo') {
        addTodo();
    } else if (target.classList.contains('delete-item')) {
        deleteTodoItem(target);
    } else if (target.classList.contains('edit-item')) {
        handleEdit(target);
    } else if (target.id === 'del-allbtn') {
        clearAllTodos();
    }
});

todoList.addEventListener('change', (event) => {
    if (event.target.classList.contains('done-item')) {
        toggleTodoCompletion(event.target);
    }
});

function addTodo() {
    const inputValue = todoInput.value.trim();

    if (inputValue === '') {
        alert('Текст завдань не може бути порожнім');
        return;
    }

    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');
    todoItem.innerHTML = `
        <p class='todo-p'>${inputValue}</p>
        <button class='edit-item'></button>
        <input type='checkbox' class='done-item'>
        <button class='delete-item'>X</button>
    `;

    todoList.appendChild(todoItem);
    todoInput.value = '';

    updateDeleteButtonAll();
}

function deleteTodoItem(button) {
    button.closest('.todo-item').remove();

    updateDeleteButtonAll();
}

function handleEdit(button) {
    const todoItem = button.closest('.todo-item');
    const textElement = todoItem.querySelector('.todo-p');
    const currentText = textElement.textContent;

    toggleTodoButtons(todoItem, false);

    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = currentText;
    editInput.classList.add('todo-input');

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.classList.add('save-item');

    todoItem.replaceChild(editInput, textElement);
    todoItem.appendChild(saveButton);
    button.style.display = 'none';

    saveButton.addEventListener('click', () => {
        const newText = editInput.value.trim();

        if (!newText) {
            alert('Текст завдань не може бути порожнім');
            return;
        }

        textElement.textContent = newText;
        todoItem.replaceChild(textElement, editInput);
        saveButton.remove();
        button.style.display = '';
        toggleTodoButtons(todoItem, true);
    });
}

function toggleTodoCompletion(checkbox) {
    const todoItem = checkbox.closest('.todo-item');
    todoItem.classList.toggle('check-bg');
}

function clearAllTodos() {
    todoList.innerHTML = '';
    
    updateDeleteButtonAll();
}

function updateDeleteButtonAll() {
    deleteButtonAll.style.display = todoList.children.length > 1 ? '' : 'none';
}

function toggleTodoButtons(todoItem, visible) {
    const buttons = todoItem.querySelectorAll('.done-item, .delete-item');
    buttons.forEach(button => {
        button.style.display = visible ? '' : 'none';
    });
}

updateDeleteButtonAll();




