function task(title, description, category, catColor, ready, todo) {
    return /*html*/ `<div class="task" draggable="true" onclick="TODO()">
  <div class="taskCategoryView" style="background-color: ${catColor}">${category}</div>
  <p class="taskTitle">${title}</p>
  <span class="taskDescription">${description}</span>
  <div id="taskSubtasks" class="taskSubtask d-none">
    <div class="taskSubtask-progressbar">
      <div class="progress-color" style="width: 15%;"></div>
    </div>
    <p>${ready}/${todo} Done</p> 
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
