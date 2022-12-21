
let allTasks = [];
let task = [];
let category = ["Sales", "Backoffice"];
let catColor = [
    "#0000FF",
    "#00FF00",
    "#FF0000",
    "#800080",
    "#F0F8FF",
    "#FF69B4",
];
const prioList = ["urgent", "medium", "low"];
let priority = "";

async function loadTasks() {
    //loadCurrentDate();  load the page with the current daytime
    await loadTasksFromBackend();
}

async function loadTasksFromBackend() {
    setURL('https://gruppe-384.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
}

async function addingTask() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('category').innerText;
    let prio = priority;
    let dueDate = document.getElementById('dueDate').value;
    task = {
      'title': title,
      'description': description,
      'category': category,
      'prio': prio,
      'dueDate': dueDate
    };
    allTasks.push(task);
    saveTasksInBackend();
    //moveToBoard();
}

  async function saveTasksInBackend(){
    setURL("https://gruppe-384.developerakademie.net/smallest_backend_ever");
    await backend.setItem('allTasks', JSON.stringify(allTasks));
  }
  
  function moveToBoard(){
    //animated message ('task added to board')
    window.location.href = 'board.html';
  }

/**
 * Open an Dropdown that you can choose a Category
 */
function expandCategory() {
    document.getElementById("category").classList.add("d-none");
    document.getElementById("category-list").classList.remove("d-none");

    appendCategory();
}

/**
 *
 */
function appendCategory() {
    let cat = document.getElementById("category-list");
    cat.innerHTML = "";

    cat.innerHTML += selectCat();
    cat.innerHTML += addOneCat();

    for (let i = 0; i < category.length; i++) {
        const elemnt = category[i];

        cat.innerHTML += categoryParam(elemnt, i);
    }
}

/**
 * minimize categorylist
 */
function miniCategory() {
    document.getElementById("category").classList.remove("d-none");
    document.getElementById("category-list").classList.add("d-none");
    document.getElementById("newCategory").classList.add("d-none");
}

/**
 * minimize dropdown and shows the addCategory input
 */
function newCategory() {
    miniCategory();
    document.getElementById("category").classList.add("d-none");
    document.getElementById("newCategory").classList.remove("d-none");
}

function switchBackground(prio) {
    for (i = 0; i < prioList.length; i++) {
        const pref = prioList[i];

        backgroundOff(pref);
    }

    backgroundOn(prio);
    priority = prio;
}

function backgroundOn(prio) {
    if (prioList.includes(prio)) {
        document.getElementById(`${prio}`).classList.add("prio-" + `${prio}`);
        document
            .getElementById(`${prio}`)
            .setAttribute("onclick", `backgroundOff("${prio}")`);
    }
}

function backgroundOff(prio) {
    document.getElementById(`${prio}`).classList.remove("prio-" + `${prio}`);
    document
        .getElementById(`${prio}`)
        .setAttribute("onclick", `switchBackground("${prio}")`);
}

function showCategory(i) {
    document.getElementById("category").textContent = category[i];
    miniCategory();
}

function addCat() {
    let newCat = document.getElementById("categoryName").value;
    let i = category.length;

    if (newCat != "") {
        category.push(newCat);
        appendCategory();
        miniCategory();
        document.getElementById("categoryName").value = "";
        showCategory(i);
    } else {
        miniCategory();
    }
}

function deleteCat() {
    document.getElementById("categoryName").value = "";
    document.getElementById("category").textContent = "Select task Category";
    miniCategory();
}

function closeCat() {
    miniCategory();
    document.getElementById("category").textContent = "Select task Category";
}

/**
 * TODO - Check date if in future or not
 */
function dateChecker() {
    let choosenDate = document.getElementById("dueDate").value;

    
}


function addSubtask() {
    let input = document.getElementById('subtaskName').value;
    let subtask = document.getElementById('subtasks');

    subtask.innerHTML = "";
    
}