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
});

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