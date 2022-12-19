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
const prioList = ["urgent", "medium", "low"];

function init() {}

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

function dateChecker() {
    let choosenDate = document.getElementById("dueDate").value;

    const today = new Date();
    console.log(today);

    if ((choosenDate = Date())) {
        //alert("Please choose a date in the future");
    }

    Date.parse;
}
