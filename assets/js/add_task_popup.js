/**
 * Open an Dropdown that you can choose a Category
 */
function expandMenuPopUp(id) {
  let button = document.getElementById(id);

  if (button.id == "popUpCategory") {
      button.classList.add("d-none");
      document.getElementById("popUpCategory-list").classList.remove("d-none");
      appendCategoryPopUp("popUpCategory-list");
      miniMenuPopUp("popUpAssigne");
  } else {
      button.classList.add("d-none");
      document.getElementById("popUpAssigne-list").classList.remove("d-none");
      appendAssignesPopUp("popUpAssigne-list");
      checkAssignePopUp();
      miniMenuPopUp("popUpCategory");
  }
}

function closeMenuPopUp(param) {
  miniMenu(param);

  if (param == "popUpCategory") {
      document.getElementById("popUpCategory").textContent =
          "Select task Category";
      document.getElementById("popUpCategory").innerHTML += addImg();
  } else {
      document.getElementById("popUpAssigne").textContent =
          "Select contacts to assign";
      document.getElementById("popUpAssigne").innerHTML += addImg();
      checkAssignePopUp();
  }
}

/**
* ---------------------- Category Section ---------------------------
*/

/**
*
*/
function appendCategoryPopUp(id) {
  let cat = document.getElementById(id);
  
  cat.innerHTML = "";

  cat.innerHTML += selectCatPopUp();
  cat.innerHTML += addOneCatPopUp();

  for (let i = 0; i < category.length; i++) {
      const elemnt = category[i];
      let color = catColor[choosenColor[i]];

      cat.innerHTML += categoryParamPopUp(elemnt, i, color);
  }
}

/**
* minimize categorylist
* @param {string} param
*/
function miniMenuPopUp(param) {
  document.getElementById(`${param}`).classList.remove("d-none");
  document.getElementById(`${param}` + "-list").classList.add("d-none");
  document.getElementById("new-" + `${param}`).classList.add("d-none");
}

/**
* minimize dropdown and shows the addCategory input
*/
function newCategoryPopUp() {
  miniMenu("popUpCategory");
  document.getElementById("popUpCategory").classList.add("d-none");
  document.getElementById("new-popUpCategory").classList.remove("d-none");
  colerCode();
}

function showCategoryPopUp(i) {
  let color = catColor[choosenColor[i]];
  document.getElementById("popUpCategory").innerHTML = categoryParam(category[i], i, color);
  document.getElementById("popUpCategory").innerHTML += addImg();
  document.getElementById("popUpCategory").firstChild.classList.remove('list-elemnt');
  miniMenuPopUp("popUpCategory");
}

function addCat() {
  let newCat = document.getElementById("categoryName").value;
  let i = category.length;

  if (newCat != "") {
      category.push(newCat);
      appendCategory();
      miniMenuPopUp("popUpCategory");
      document.getElementById("categoryName").value = "";
      showCategoryPopUp(i);
  } else {
      miniMenuPopUp("PopUpCategory");
  }
}

function addCatHitEnter() {
  document
      .getElementById("categoryName")
      .addEventListener("keyup", (event) => {
          if (event.key == "Enter") {
              addCat();
          }
      });
}

function deleteCat() {
  document.getElementById("categoryName").value = "";
  document.getElementById("popUpCategory").textContent = "Select task Category";
  document.getElementById("popUpCategory").innerHTML += addImg();
  miniMenuPopUp("popUpCategory");
}

/**
* shows color Buttons under new Category Input
*/
function colerCode() {
  let colors = document.getElementById("colorCode");
  colors.innerHTML = "";
  for (let i = 0; i < catColor.length; i++) {
      const color = catColor[i];

      colors.innerHTML += addColorbtn(color, i);
  }
}

function colorAdd(num) {
  let newCat = document.getElementById("categoryName").value;

  if (newCat != "") {
      choosenColor.push(num)
  }
}

/**
* --------------------- Assigned to Section ----------------------------
*/

function appendAssignesPopUp(id) {
  let assigne = document.getElementById(id);
  assigne.innerHTML = "";
  assigne.innerHTML += selectAssignePopUp();

  for (let i = 0; i < users.length; i++) {
      const elemnt = users[i].name;

      assigne.innerHTML += assigneParamPopUp(elemnt, i);
  }
  assigne.innerHTML += inviteAssignePopUp();
}

function newAssignePopUp() {
  miniMenu('popUpAssigne');
  document.getElementById('popUpAssigne').classList.add('d-none');
  document.getElementById('new-popUpAssigne').classList.remove('d-none');
}

function showAssignePopUp(num) {
  let checkbox = document.getElementById("checkbox" + num);

  if (checkbox.checked == true) {
      checkbox.checked = false;
      removeAssigneFromTask(num);
  } else {
      checkbox.checked = true;
      addAssignetoTask(num);
  }
}

function checkAssignePopUp() {
  document.getElementById('avatar').innerHTML = "";
  for (let i = 0; i < users.length; i++) {
      let checkbox = document.getElementById("checkbox" + i);
      const element = users[i].name;
      if (assigne.includes(element)) {
          checkbox.checked = true;
          addAvatar(i);
      }
  }
}

function addAssignetoTask(num) {
  let name = users[num].name;
  //let initials = users[num].name.substring(0, 2).toUpperCase();
  if (assigne.includes(name)) {
      checkAssignePopUp();
  } else {
      assigne.push(name);
      checkAssignePopUp();
  }
}

function removeAssigneFromTask(num) {
  let name = users[num].name;
  let index = assigne.indexOf(name);
  if (index > -1) {
      assigne.splice(index, 1)
  }
  checkAssignePopUp();
}

function addAvatar(num) {
  let name = users[num].name.substring(0, 2).toUpperCase();
  let color = users[num].color

  document.getElementById('avatar').innerHTML += avatar(name, color);
}

function removeTasksPopUp() {
  subtasks = [];
  assigne = [];
  clearPopUp();
}

function clearPopUp() {
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("popUpCategory").innerText = "Select task Category";
  document.getElementById("popUpCategory").innerHTML += addImg();
  miniMenuPopUp("popUpAssigne");
  //backgroundOff(priority);
  document.getElementById("dueDate").value = "";
  document.getElementById("subtaskName").value = "";
  document.getElementById("subtasks").innerHTML = "";
  document.getElementById("avatar").innerHTML = "";
}