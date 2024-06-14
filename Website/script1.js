const todoList = document.getElementById('todoList');
const newItemInput = document.getElementById('newItem');
const addButton = document.getElementById('addButton');

let taskNumber = 1;
let tasks = [];

// Load tasks from localStorage (if available)
const storedTasks = localStorage.getItem('tasks');
if (storedTasks) {
  tasks = JSON.parse(storedTasks);
  taskNumber = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
  renderTasks();
}

function getFormattedDate() {
  const date = new Date();
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

function createTask(taskText) {
  const task = {
    id: taskNumber++,
    text: taskText,
    completed: false,
    createdDate: getFormattedDate(), // Store the creation date
  };
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
  newItemInput.value = ''; // Clear input field after adding task
}

function renderTasks() {
  todoList.innerHTML = '';
  tasks.forEach(task => {
    const listItem = document.createElement('li');
    listItem.classList.add('todo-item');
    listItem.innerHTML = `
      <input type="checkbox" id="checkbox-${task.id}" ${task.completed ? 'checked' : ''}>
      <label for="checkbox-${task.id}">${task.text} <span class="created-date">${task.createdDate}</span></label>
      <i class="fas fa-trash-alt delete-task" data-id="${task.id}"></i>
    `;
    todoList.appendChild(listItem);
    if (task.completed) {
      listItem.classList.add('completed'); // Add "completed" class if task is already marked complete
    }
  });
}

addButton.addEventListener('click', function() {
  const taskText = newItemInput.value.trim();
  if (taskText) {
    createTask(taskText);
  }
});

todoList.addEventListener('click', function(event) {
  const target = event.target;
  if (target.classList.contains('delete-task')) {
    const taskId = parseInt(target.dataset.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    }
  } else if (target.tagName === 'INPUT' && target.type === 'checkbox') {
    const taskId = parseInt(target.id.split('-')[1]);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      tasks[taskIndex].completed = target.checked;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      const listItem = target.parentElement;
      listItem.classList.toggle('completed'); // Toggle "completed" class based on checkbox state
    }
  }
});