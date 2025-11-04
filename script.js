// Get DOM elements
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');

// Array to hold our todo objects
let todos = [];

// Initialize the app
function init() {
    // Load todos from local storage
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
        todos = savedTodos;
    }
    renderTodos();
}

// Render the todo list
function renderTodos() {
    // Clear the current list
    todoList.innerHTML = '';

    // Counter for active items
    let activeCount = 0;

    // Create a list item for each todo
    todos.forEach((todo, index) => {
        if (!todo.completed) {
            activeCount++;
        }

        const li = document.createElement('li');
        li.className = 'todo-item';

        // Create checkbox
        const checkbox = document.createElement('div');
        checkbox.className = `todo-checkbox ${todo.completed ? 'checked' : ''}`;
        checkbox.addEventListener('click', () => toggleTodo(index));

        // Create todo text
        const todoText = document.createElement('span');
        todoText.className = `todo-text ${todo.completed ? 'completed' : ''}`;
        todoText.textContent = todo.text;

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '&times;'; // The 'X' symbol
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering other events
            deleteTodo(index);
        });

        // Assemble the todo item
        li.appendChild(checkbox);
        li.appendChild(todoText);
        li.appendChild(deleteBtn);

        // Add to the list
        todoList.appendChild(li);
    });

    // Update the item counter
    itemCountSpan.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
}

// CREATE - Add a new todo
function addTodo() {
    const text = todoInput.value.trim();

    if (text !== '') {
        // Create a new todo object
        const newTodo = {
            text: text,
            completed: false,
            id: Date.now() // Simple unique ID
        };

        // Add to our array
        todos.push(newTodo);

        // Clear the input
        todoInput.value = '';

        // Update the display and storage
        saveAndRender();
    }
}

// READ & UPDATE - Toggle todo completion status
function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    saveAndRender();
}

// DELETE - Remove a todo
function deleteTodo(index) {
    todos.splice(index, 1);
    saveAndRender();
}

// Save to local storage and re-render the list
function saveAndRender() {
    // Save to local storage
    localStorage.setItem('todos', JSON.stringify(todos));
    // Update the UI
    renderTodos();
}

// Event Listeners
addButton.addEventListener('click', addTodo);

// Also allow adding a todo by pressing "Enter"
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Start the app!
init();