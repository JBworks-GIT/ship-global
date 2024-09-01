function moveTask(button, targetListId) {
    const taskItem = button.parentElement;
    const targetList = document.getElementById(targetListId);
    
    const buttons = taskItem.querySelectorAll('button');
    buttons.forEach(btn => btn.remove());

    if (targetListId === 'backlog-list') {
        taskItem.innerHTML += '<button class="nav-right" onclick="moveTask(this, \'todo-list\')">→</button>';
    } else if (targetListId === 'todo-list') {
        taskItem.innerHTML += '<button class="nav-left" onclick="moveTask(this, \'backlog-list\')">←</button>';
        taskItem.innerHTML += '<button class="nav-right" onclick="moveTask(this, \'ongoing-list\')">→</button>';
    } else if (targetListId === 'ongoing-list') {
        taskItem.innerHTML += '<button class="nav-left" onclick="moveTask(this, \'todo-list\')">←</button>';
        taskItem.innerHTML += '<button class="nav-right" onclick="moveTask(this, \'done-list\')">→</button>';
    } else if (targetListId === 'done-list') {
        taskItem.innerHTML += '<button class="nav-left" onclick="moveTask(this, \'ongoing-list\')">←</button>';
    }
    
    taskItem.innerHTML += '<button class="edit-button" onclick="editTask(this)">✎</button>';

    targetList.appendChild(taskItem);
}

function editTask(button) {
    const taskItem = button.parentElement;
    const taskText = taskItem.childNodes[0].nodeValue.trim();

    const input = document.createElement('input');
    input.type = 'text';
    input.value = taskText;
    input.classList.add('edit-input');
    
    taskItem.childNodes[0].replaceWith(input);

    button.textContent = '💾';
    button.onclick = function() {
        saveTask(this, input);
    };

    if (!taskItem.querySelector('.delete-button')) {
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '🗑';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = function() {
            deleteTask(this);
        };
        taskItem.appendChild(deleteButton);
    }
}

function saveTask(button, input) {
    const newTaskName = input.value.trim();

    if (newTaskName) {
        input.replaceWith(document.createTextNode(newTaskName + ' '));

        button.textContent = '✎';
        button.onclick = function() {
            editTask(this);
        };

        const deleteButton = button.nextElementSibling;
        if (deleteButton && deleteButton.classList.contains('delete-button')) {
            deleteButton.remove();
        }
    } else {
        alert("Task name cannot be empty!");
    }
}

function deleteTask(button) {
    const taskItem = button.parentElement;
    taskItem.remove();
}
