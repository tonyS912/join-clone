const barNames = ["To do", "in progress", "Awaiting feedback", "Done"];
const barIDs = ["todo", "inProgress", "awaitFeedback", "done"];
let taskPosition = [];
let subtasksLength = "";
const urgent = "./assets/img/arrows-up.svg";
const medium = "./assets/img/equal-sign.svg";
const low = "./assets/img/arrows-down.svg";
// const catColor = [
//     "#8AA4FF",
//     "#FF0000",
//     "#2AD300",
//     "#FF8A00",
//     "#E200BE",
//     "#0038FF",
// ];
let choosenCatColor = "";
// let priority = "";

function dragandDrop() {
    const draggables = document.querySelectorAll(".task");
    const droppables = document.querySelectorAll(".column");

    draggables.forEach((task) => {
        task.addEventListener("dragstart", () => {
            task.classList.add("is-dragging"); // Add a custom class to the task being dragged to give it some visual styling
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

            if (!bottomTask) {
                // if we don t have a task on the bottom of current draged task
                zone.appendChild(curTask);
            } else {
                // if we have have a task on the bottom of current task
                zone.insertBefore(curTask, bottomTask); // insert the current task before bottomTask
            }
        });
    });
}

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

async function updateTask(id) {
    const pos = document.getElementById(`${id}`).parentNode.id;
    allTasks[id].position = `${pos}`;
    await saveTasksInBackend();
    await loadTasksFromBackend();
}

async function loadTasksFromBackend() {
    setURL("https://gruppe-384.developerakademie.net/smallest_backend_ever");
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem("allTasks")) || [];
    choosenColor = JSON.parse(backend.getItem("choosenColor")) || [1, 4, 2, 5];
    category = JSON.parse(backend.getItem("category")) || [
        "Sales",
        "Backoffice",
        "Marketing",
        "Coding",
    ];
    users = JSON.parse(backend.getItem("contacts")) || [];
}

async function loadTasks() {
    await loadTasksFromBackend();
    renderBarTitle();
    readPosition();
    dragandDrop();
}

function readPosition() {
    for (i = 0; i < allTasks.length; i++) {
        const section = allTasks[i].position;
        const task = allTasks[i];

        renderTask(section, task, i);
    }
}

/**
 * render Tasks with subtasks
 */
function renderTask(section, testTasks, i) {
    let todo = document.getElementById(`${section}`);
    
    renderSubtasks(i);
    chooseColor(i);
    userPrio(i);
    todo.innerHTML += taskings(
        i,
        testTasks.title,
        testTasks.description,
        testTasks.category,
        subtasksLength,
        choosenCatColor,
        prio = priority
    );
    showSubtasks(i); //Shows Subtask if subtask are in the array
    renderUsers(i); //Shows user they invited for this task
}

function renderBarTitle() {
    for (let i = 0; i < barNames.length; i++) {
        const barName = barNames[i];
        const barID = barIDs[i];
        let bar = document.getElementById(barID);
        bar.innerHTML = "";
        bar.innerHTML += barTitle(barName);
    }
}

function userPrio(num) {
    switch (allTasks[num].prio) {
        case "urgent":
            priority = urgent;
            break;
        case "medium":
            priority = medium;
            break;
        default:
            priority = low;
    }
}

function chooseColor(num) {
    let cat = allTasks[num].category;
    for (let i = 0; i < category.length; i++) {
        const task = category[i];
        if (cat == task) {
            choosenCatColor = catColor[choosenColor[i]];
        }
    }
}

function renderSubtasks(num) {
    const subs = allTasks[num].subtasks;
    subtasksLength = subs.length;
}

function showSubtasks(num) {
    const singleTask = allTasks[num].subtasks;

    if (singleTask.length > 0) {
        document
            .getElementById(`taskSubtasks${num}`)
            .classList.remove("d-none");
    }
}

/**
 * TODO - need to be updated after checkbox.checked
 */
function updateSubtasks() { }

function showAddTaskForm() {
    let addTask_overlap = document.getElementById("addTask_overlap");
    addTask_overlap.classList.remove("d-none");
}

/**
 * Render task users
 */
function assignesInvite(num) {
    const thisTask = allTasks[num];
}

function renderUsers(num) {
    let member = document.getElementById(`taskUser${num}`);
    member.innerHTML = "";

    for (let i = 0; i < allTasks[num].assignes.length; i++) {
        const assigne = allTasks[num].assignes[i];
        for (let j = 0; j < users.length; j++) {
            const thisUser = users[j];
            if (thisUser.name == assigne) {
                let userColor = thisUser.color;
                let name = assigne.substring(0, 2).toUpperCase();
                member.innerHTML += taskUser(name, userColor);
            }
        }
    }
}

function showThisTask(num) {
    document.getElementById("taskDetail").classList.remove("d-none");
    document.getElementById("taskDetails").classList.remove("d-none");
}

function closePopUp() {
    document.getElementById("taskDetail").classList.add("d-none");
    document.getElementById("taskDetails").classList.add("d-none");
}

function renderTaskDetails(num) { }

function closeWindow() {
    let addTask_overlap = document.getElementById("addTask_overlap");
    addTask_overlap.classList.add("d-none");
}

function doNotCloseWindow(event) {
    event.stopPropagation();
}


function findTask() {
    let search = document.getElementById('searched_input').value;
    search = search.toLowerCase().trim();
    const boardTasks = document.querySelectorAll(".task"); 
    for (let j = 0; j < boardTasks.length; j++) {
        const div = boardTasks[j];
        const pElement = div.querySelector("p");
        let P_innerHTML = pElement.innerHTML.toLowerCase();
        if (P_innerHTML.includes(search)) {
            div.style.display = "block";
        } else {
            div.style.display = "none";
        }
    }
}