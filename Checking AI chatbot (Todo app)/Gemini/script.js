document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const priorityInput = document.getElementById('priorityInput');
    const categoryInput = document.getElementById('categoryInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const filterCategory = document.getElementById('filterCategory');
    const searchTaskInput = document.getElementById('searchTask');
    const themeSelector = document.getElementById('themeSelector'); // Get theme selector

    let tasks = loadTasks();
    renderTasks();

    addTaskButton.addEventListener('click', addTask);
    filterCategory.addEventListener('change', renderTasks);
    searchTaskInput.addEventListener('input', renderTasks);
    themeSelector.addEventListener('change', function() { // Event listener for theme selector
        const selectedTheme = themeSelector.value;
        setTheme(selectedTheme);
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const dueDate = dueDateInput.value;
        const priority = priorityInput.value;
        const category = categoryInput.value;

        const task = {
            id: Date.now(),
            text: taskText,
            dueDate: dueDate,
            priority: priority,
            category: category,
            completed: false
        };

        tasks.push(task);
        saveTasks();
        renderTasks();

        taskInput.value = '';
        dueDateInput.value = ''; // Clear due date input after adding task.
        priorityInput.value = 'low'; // Reset priority to default value if needed
        categoryInput.value = 'work'; // Reset category to default if needed
    }

    function renderTasks() {
        taskList.innerHTML = '';
        const selectedCategory = filterCategory.value;
        const searchText = searchTaskInput.value.toLowerCase();

        const filteredTasks = tasks.filter(task => {
            if (selectedCategory !== 'all' && task.category !== selectedCategory) {
                return false;
            }
            if (searchText && !task.text.toLowerCase().includes(searchText)) {
                return false;
            }
            return true;
        });

        filteredTasks.sort((a, b) => {
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority]; // Sort by priority, high to low
        });

        filteredTasks.forEach(task => {
            const listItem = document.createElement('li');
            if (task.completed) {
                listItem.classList.add('completed');
            }

            const taskDetails = document.createElement('div');
            taskDetails.className = 'task-details';

            const taskTextElement = document.createElement('span');
            taskTextElement.textContent = task.text;

            const taskMeta = document.createElement('div');
            taskMeta.className = 'task-meta';
            taskMeta.textContent = `Due Date: ${task.dueDate || 'None'}, Priority: ${task.priority}, Category: ${task.category}`;
            taskMeta.style.fontSize = '0.8em';
            taskMeta.style.color = '#777';

            taskDetails.appendChild(taskTextElement);
            taskDetails.appendChild(taskMeta);

            const taskButtons = document.createElement('div');
            taskButtons.className = 'task-buttons';

            const completeButton = document.createElement('button');
            completeButton.textContent = task.completed ? 'Mark Incomplete' : 'Mark Complete';
            completeButton.className = 'complete-button';
            completeButton.addEventListener('click', () => toggleComplete(task.id));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteTask(task.id));

            taskButtons.appendChild(completeButton);
            taskButtons.appendChild(deleteButton);

            listItem.appendChild(taskDetails);
            listItem.appendChild(taskButtons);
            taskList.appendChild(listItem);
        });
    }

    function toggleComplete(taskId) {
        const task = tasks.find(task => task.id === taskId);
        if (task) {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        }
    }

    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasks();
        renderTasks();
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    }

    function setTheme(themeName) {
        document.body.className = themeName + '-theme'; // Set body class name
        saveTheme(themeName); // Save theme to local storage
    }

    function saveTheme(themeName) {
        localStorage.setItem('selectedTheme', themeName);
    }

    function loadTheme() {
        const selectedTheme = localStorage.getItem('selectedTheme') || 'light'; // Default theme is 'light'
        setTheme(selectedTheme);
        themeSelector.value = selectedTheme; // Set selector to selected theme
    }
});