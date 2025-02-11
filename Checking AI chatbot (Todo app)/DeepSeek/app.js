// Dark Mode Toggle
const darkModeToggle = document.createElement('div');
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.innerHTML = '🌓';
document.body.prepend(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  const isDark = document.body.classList.contains('dark-theme');
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
});

// نیا ایڈٹ موڈل
function editTask(id) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <input type="text" id="editInput" value="${tasks.find(task => task.id === id).text}">
      <div style="margin-top: 15px; display: flex; gap: 10px;">
        <button onclick="saveEdit(${id})" style="flex:1">Save</button>
        <button onclick="closeModal()" style="background: var(--danger); flex:1">Cancel</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  modal.style.display = 'flex';
  document.getElementById('editInput').focus();
}

function saveEdit(id) {
  const newText = document.getElementById('editInput').value.trim();
  if(newText) {
    tasks = tasks.map(task => 
      task.id === id ? {...task, text: newText} : task
    );
    saveTasks();
    renderTasks();
  }
  closeModal();
}

function closeModal() {
  document.querySelector('.modal').remove();
}

// چیک باکس کو اپڈیٹ کریں
function renderTasks(taskArray = tasks) {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  
  taskArray.forEach(task => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    
    li.innerHTML = `
      <div class="custom-checkbox ${task.completed ? 'checked' : ''}" onclick="toggleComplete(${task.id})"></div>
      <span class="task-text">${task.text}</span>
      <button class="edit-btn" onclick="editTask(${task.id})">✏️ Edit</button>
      <button class="delete-btn" onclick="deleteTask(${task.id})">🗑️ Delete</button>
    `;
    
    taskList.appendChild(li);
  });
}