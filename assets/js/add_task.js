let allTasks = [];
let category = ['New Category', 'Sales', 'Backoffice'];
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

function expandCategory() {
  document.getElementById('category').classList.add("d-none");
  document.getElementById('category-list').classList.remove("d-none");
}

function miniCategory() {
  document.getElementById('category').classList.remove('d-none');
  document.getElementById('category-list').classList.add('d-none');
}