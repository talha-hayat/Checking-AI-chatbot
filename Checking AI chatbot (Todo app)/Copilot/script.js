document.getElementById('addTaskButton').addEventListener('click', addTask);
document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const reminderInput = document.getElementById('reminderInput');
    const priorityInput = document.getElementById('priorityInput');
    
    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;
    const reminderTime = reminderInput.value;
    const priority = priorityInput.value;
    
    if (taskText === '') return;

    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
        <span class="task-text">${taskText}</span>
        <span class="due-date">${dueDate}</span>
        <span class="reminder">${reminderTime}</span>
        <span class="priority ${priority}">${priority}</span>
        <button class="edit-button" onclick="editTask(this)">Edit</button>
        <button class="delete-button" onclick="deleteTask(this)">Delete</button>`;
    document.getElementById('taskList').appendChild(taskItem);
    
    saveTask(taskText, dueDate, reminderTime, priority);
    taskInput.value = '';
    dueDateInput.value = '';
    reminderInput.value = '';
    priorityInput.value = 'low';
}

function saveTask(taskText, dueDate, reminderTime, priority) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.push({ taskText, dueDate, reminderTime, priority });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.forEach(({ taskText, dueDate, reminderTime, priority }) => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span class="task-text">${taskText}</span>
            <span class="due-date">${dueDate}</span>
            <span class="reminder">${reminderTime}</span>
            <span class="priority ${priority}">${priority}</span>
            <button class="edit-button" onclick="editTask(this)">Edit</button>
            <button class="delete-button" onclick="deleteTask(this)">Delete</button>`;
        document.getElementById('taskList').appendChild(taskItem);
    });
}

function editTask(button) {
    const taskItem = button.parentElement;
    const taskText = taskItem.querySelector('.task-text').textContent;
    const dueDate = taskItem.querySelector('.due-date').textContent;
    const reminderTime = taskItem.querySelector('.reminder').textContent;
    const priority = taskItem.querySelector('.priority').textContent;

    document.getElementById('taskInput').value = taskText;
    document.getElementById('dueDateInput').value = dueDate;
    document.getElementById('reminderInput').value = reminderTime;
    document.getElementById('priorityInput').value = priority.toLowerCase();
    
    deleteTask(button);
}

function deleteTask(button) {
    const taskItem = button.parentElement;
    const taskText = taskItem.querySelector('.task-text').textContent;

    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks = tasks.filter(task => task.taskText !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    taskItem.remove();
}
