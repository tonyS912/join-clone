function expandMenuPopUp(id) {
  let button = document.getElementById(id);

  if (button.id == "popUpCategory") {
      button.classList.add("d-none");
      document.getElementById("popUpCategory-list").classList.remove("d-none");
      appendCategory("popUpCategory-list");
      miniMenu("popUpAssigne");
  } else {
      button.classList.add("d-none");
      document.getElementById("popUpAssigne-list").classList.remove("d-none");
      appendAssignes("popUpAssigne-list");
      checkAssigne();
      miniMenu("popUpCategory");
  }
}

function removeTasksPopUp() {
  subtasks = [];
  assigne = [];
  clearPopUp();
}

/**
* clear task preview
*/
function clearPopUp() {
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("popUpCategory").innerText = "Select task Category";
  document.getElementById("popUpCategory").innerHTML += addImg();
  miniMenu("PopUpAssigne");
  backgroundOff(priority);
  document.getElementById("dueDate").value = "";
  document.getElementById("subtaskName").value = "";
  document.getElementById("subtasks").innerHTML = "";
  document.getElementById("avatar").innerHTML = "";
}