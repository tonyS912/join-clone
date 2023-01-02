const barNames = ["To do", "in progress", "Awaiting feedback", "Done"];
let taskPosition = [];


setTimeout(function() {
const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".column");

draggables.forEach((task) => {
  task.addEventListener("dragstart", () => {
    task.classList.add("is-dragging"); // Add a custom class to the element being dragged to give it some visual styling
  });
  task.addEventListener("dragend", () => {
    task.classList.remove("is-dragging");
  });
});

droppables.forEach((zone) => {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault(); // Allow the drop to happen

    const bottomTask = insertAboveTask(zone, e.clientY);
    const curTask = document.querySelector(".is-dragging"); 

    if (!bottomTask) {// if we don t have a task on the bottom of current draged task
      zone.appendChild(curTask);
    } else { // if we have have a task on the bottom of current task
      zone.insertBefore(curTask, bottomTask); // insert the current task before bottomTask
    }
  });
})
}, 2100);

const insertAboveTask = (zone, mouseY) => {
  const taskNotDragging = zone.querySelectorAll(".task:not(.is-dragging)"); 

  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY; // closest Position should have negative value

  taskNotDragging.forEach((task) => {
    const { top } = task.getBoundingClientRect();

    const offset = mouseY - top;

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTask = task;
    }
  });

  return closestTask;
};


async function loadTasksFromBackend() {
  setURL("https://gruppe-384.developerakademie.net/smallest_backend_ever");
  await downloadFromServer();
  allTasks = JSON.parse(backend.getItem("allTasks")) || [];
  category = JSON.parse(backend.getItem("category")) || [
      "Sales",
      "Backoffice",
      "Marketing",
      "Coding",
  ];
  users = JSON.parse(backend.getItem("contacts")) || [
      {
          uuid: "8942e28a-4448-4c07-9ee9-0ae04e32557e",
          name: "Hans Peter",
          email: "hans@peter.foo",
          phone: "01601023123",
          color: "f0d311",
      },
      {
          uuid: "8942e28a-3442-4c07-9ee9-0ae04e32557e",
          name: "Senior Erpel",
          email: "erpel@teasd.de",
          phone: "01601022343123",
          color: "a0a311",
      },
  ];
}

async function loadTasks() {
  await loadTasksFromBackend();
  renderTask();
}

/**
 * render Tasks
 */
function renderTask() {
  let todo = document.getElementById("todo");
  todo.innerHTML = "";
  todo.innerHTML += barTitle(barNames[0])
  
  for (let i = 0; i < allTasks.length; i++) {
    const testTasks = allTasks[i];
    todo.innerHTML += taskings(testTasks.title, testTasks.description, testTasks.category);
  }
}

function showAddTaskForm(){
  let addTask_overlap = document.getElementById('addTask_overlap');
  addTask_overlap.classList.remove('d-none');
  console.log('klick')
}


function closeWindow(){
  let addTask_overlap = document.getElementById('addTask_overlap');
  addTask_overlap.classList.add('d-none');
}

function doNotCloseWindow(event){
  event.stopPropagation();
}