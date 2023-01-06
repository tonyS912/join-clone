function taskings(num, title, description, category, length, color, prio) {
    return /*html*/ `<div class="task" id="${num}" draggable="true" onclick="showThisTask(${num})" ondragend="updateTask(this.id)">
  <div class="taskCategoryView" style="background-color: ${color}">${category}</div>
  <p class="taskTitle">${title}</p>
  <span class="taskDescription">${description}</span>
  <div id="taskSubtasks${num}" class="taskSubtask d-none">
    <div class="taskSubtask-progressbar">
      <div class="progress-color" style="width: 0%;"></div>
    </div>
    <p>0/${length}</p> 
  </div>
  <div class="userTab">
  <div id="taskUser${num}" class="taskUser">
    
  </div>
  <img style="padding-top: 20px;" src="${prio}">
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
