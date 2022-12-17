let allTasks = [];
let category = ["Sales", "Backoffice"];
let catColor = [
    "#0000FF",
    "#00FF00",
    "#FF0000",
    "#800080",
    "#F0F8FF",
    "#FF69B4",
];


/**
 * Push Information about tasks into loacal storage
 */
function addingTask() {
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;

    let task = {
        title: title,
        description: description,
    };

    allTasks.push(task);

    let allTasksAsString = JSON.stringify(allTasks);
    localStorage.setItem("allTasks", allTasksAsString);
}

function loadTasks() {
    let allTasksAsString = localStorage.getItem("allTasks");
    allTasks = JSON.parse(allTasksAsString);
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

        cat.innerHTML += categoryParam(elemnt);
    }
}

/**
 * minimize categorylist
 */
function miniCategory() {
    document.getElementById("category").classList.remove("d-none");
    document.getElementById("category-list").classList.add("d-none");
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
    const prioList = ["urgent", "medium", "low"];

    if (prioList.includes(prio) ) {
        document.getElementById(`${prio}`).classList.add('prio-' + `${prio}`);
        document.getElementById(`${prio}`).setAttribute("onclick", `backgroundOff("${prio}")`);
    }
}

function backgroundOff(prio) {
    document.getElementById(`${prio}`).classList.remove('prio-' + `${prio}`);
    document.getElementById(`${prio}`).setAttribute("onclick", `switchBackground("${prio}")`);
}