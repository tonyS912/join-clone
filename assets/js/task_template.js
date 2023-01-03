function taskings(num, title, description, category, length, color) {
    return /*html*/ `<div class="task" draggable="true" onclick="showThisTask(${num})">
  <div class="taskCategoryView" style="background-color: ${color}">${category}</div>
  <p class="taskTitle">${title}</p>
  <span class="taskDescription">${description}</span>
  <div id="taskSubtasks${num}" class="taskSubtask d-none">
    <div class="taskSubtask-progressbar">
      <div class="progress-color" style="width: 0%;"></div>
    </div>
    <p>0/${length}</p> 
  </div>
  <div id="taskUser${num}" class="taskUser">
    <div class="contact--left__UserAvatar margin-10r" style="background-color: #a0a311 !Important">
      <span class="contact-initials">SE</span>
    </div>
    <div class="contact--left__UserAvatar margin-10r d-none" style="background-color: #a0a311 !Important">
      <span class="contact-initials">SE</span>
    </div>
    <div class="contact--left__UserAvatar margin-10r d-none" style="background-color: #a0a311 !Important">
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

function taskUser(initials, color) {
  return /*html*/ `<div class="contact--left__UserAvatar margin-10r" style="background-color: #${color} !Important">
  <span class="contact-initials">${initials}</span>
</div>`;
}