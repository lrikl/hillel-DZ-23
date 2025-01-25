'use strict';

const todoList = document.getElementById('todo-list');
const todoInput = document.getElementById('todo-input');
const todoBlock = document.querySelector('.todo-block');
const deleteButtonAll = document.getElementById('del-allbtn');

todoBlock.addEventListener('click', (event) => {
    if (event.target.id === 'add-todo') {
        const inputValue = todoInput.value.trim();

        if (inputValue.length === 0) {
            alert('Текст завдань не може бути порожнім');
            return;
        }

        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');
        todoItem.innerHTML = `  <p class='todo-p'>${inputValue}</p>
                                <button class='edit-item'></button>
                                <input type='checkbox' class='done-item'>
                                <button class='delete-item'>X</button>
                            `;
                                
        todoList.appendChild(todoItem);
        todoInput.value = '';

        updateDeleteButtonAll();

    } else if (event.target.classList.contains('delete-item')) {
        event.target.closest('.todo-item').remove();

        updateDeleteButtonAll();

    } else if (event.target.classList.contains('edit-item')) {
        handleEdit(event);

    } else if (event.target.id === 'del-allbtn') {
        const todoItems = document.querySelectorAll('.todo-item');
        todoItems.forEach(item => {
            item.remove();
        });

        updateDeleteButtonAll();
    }
});

todoList.addEventListener('change', (event) => {
    if (event.target.classList.contains('done-item')) {
        const todoItem = event.target.closest('.todo-item');
        todoItem.classList.toggle('check-bg');
    }
});

// редагування завдань

function handleEdit(event) {
    const todoItem = event.target.closest('.todo-item');
    const textElement = todoItem.querySelector('.todo-p');
    const currentText = textElement.textContent;

    const anotherButtons = todoItem.querySelectorAll('.done-item, .delete-item')
    anotherButtons.forEach(button => {
        button.style.display = 'none';
    });

    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = currentText;
    editInput.classList.add('todo-input');

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.classList.add('save-item');

    todoItem.replaceChild(editInput, textElement);
    todoItem.appendChild(saveButton);

    event.target.style.display = 'none';

    saveButton.addEventListener('click', () => {
        const newText = editInput.value.trim();

        if (!newText) {
            alert('Текст задачи не может быть пустым');
            return;
        }

        textElement.textContent = newText;
        todoItem.replaceChild(textElement, editInput);
        saveButton.remove();
        event.target.style.display = '';

        anotherButtons.forEach(button => {
            button.style.display = '';
        });
    });
}

function updateDeleteButtonAll() {
    deleteButtonAll.style.display = todoList.children.length > 1 ? '' : 'none';
}

updateDeleteButtonAll();




