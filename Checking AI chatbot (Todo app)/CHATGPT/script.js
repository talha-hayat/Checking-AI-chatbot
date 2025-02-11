/* script.js */
document.addEventListener("DOMContentLoaded", function() {
    // Local storage se tasks load karain
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("todo-list");
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo-input");
  
    // Tasks ko localStorage mein save karne ka function
    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    // Tasks ko display karne ka function
    function renderTasks() {
      taskList.innerHTML = "";
      tasks.forEach(task => {
        const li = document.createElement("li");
        li.dataset.id = task.id;
        li.className = task.completed ? "completed" : "";
  
        // Task text
        const span = document.createElement("span");
        span.textContent = task.text;
        // Task ko complete/incomplete toggle karne ke liye
        span.addEventListener("click", () => {
          task.completed = !task.completed;
          saveTasks();
          renderTasks();
        });
  
        // Edit button
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit");
        editBtn.addEventListener("click", (e) => {
          e.stopPropagation(); // Toggle event rokne ke liye
          const newText = prompt("Edit your task:", task.text);
          if (newText !== null && newText.trim() !== "") {
            task.text = newText.trim();
            saveTasks();
            renderTasks();
          }
        });
  
        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete");
        deleteBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          tasks = tasks.filter(t => t.id !== task.id);
          saveTasks();
          renderTasks();
        });
  
        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
      });
    }
  
    // Naya task add karne ke liye form submission event
    todoForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const text = todoInput.value.trim();
      if (text !== "") {
        const newTask = {
          id: Date.now(),  // Unique ID ke liye
          text: text,
          completed: false
        };
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        todoInput.value = "";
      }
    });
  
    // Initial render
    renderTasks();
  });
  