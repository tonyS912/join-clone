function taskings(title, description, category) {
    return /*html*/ `<div class="task" draggable="true">
  <div class="taskCategoryView" style="background-color: orange">${category}</div>
  <p class="taskTitle">${title}</p>
  <span class="taskDescription">${description}</span>
  <div id="taskSubtasks" class="taskSubtask d-none">
    <div class="taskSubtask-progressbar">
      <div class="progress-color" style="width: 15%;"></div>
    </div>
    <p>0/0 Done</p> 
  </div>
  <div id="taskUser" class="taskUser">
    <div class="contact--left__UserAvatar margin-10r" style="background-color: #a0a311 !Important">
      <span class="contact-initials">SE</span>
    </div>
    <div class="contact--left__UserAvatar margin-10r" style="background-color: #a0a311 !Important">
      <span class="contact-initials">SE</span>
    </div>
  </div>
</div>`;
}


function barTitle(title) {
  return /*html*/ `<div class="column_header">
  <h4 class="heading">${title}</h4>
  <div
      class="plus_icon"
      onclick="showAddTaskForm()"
  ></div>
</div>`;
}