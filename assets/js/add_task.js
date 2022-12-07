let allTasks = [];
let category = [];
let catColor = ['#0000FF', '#00FF00', '#FF0000', '#800080', '#F0F8FF', '#FF69B4'];

function addingTask() {
  let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;

  let task = {
    'title': title,
    'description': description
  };

  allTasks.push(task);

  let allTasksAsString = JSON.stringify(allTasks);
  localStorage.setItem('allTasks', allTasksAsString);
}

function loadTasks() {
  let allTasksAsString = localStorage.getItem('allTasks');
  allTasks = JSON.parse(allTasksAsString);
}