const barNames = ["To do", "in progress", "Awaiting feedback", "Done"];
const barIDs = ["todo", "inProgress", "awaitFeedback", "done"];
let taskPosition = [];
let subtasksLength = "";
const urgent = "./assets/img/arrows-up.svg";
const medium = "./assets/img/equal-sign.svg";
const low = "./assets/img/arrows-down.svg";
const catColor = [
    "#8AA4FF",
    "#FF0000",
    "#2AD300",
    "#FF8A00",
    "#E200BE",
    "#0038FF",
];
let choosenCatColor = "";

function dragandDrop() {
    const draggables = document.querySelectorAll(".task");
    const droppables = document.querySelectorAll(".column");

    draggables.forEach((task) => {
        task.addEventListener("dragstart", () => {
            task.classList.add("is-dragging"); // Add a custom class to the element being dragged to give it some visual styling
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
    users = JSON.parse(backend.getItem("contacts")) || [
        {
            uuid: "8942e28a-4448-4c07-9ee9-0ae04e32557e",
            name: "Hans Peter",
            email: "hans@peter.foo",
            phone: "01601023123",
            color: "00d311",
        },
        {
            uuid: "8942e28a-3442-4c07-9ee9-0ae04e32557e",
            name: "Senior Erpel",
            email: "erpel@teasd.de",
            phone: "01601022343123",
            color: "a0abf1",
        },
    ];
}

async function loadTasks() {
    await loadTasksFromBackend();
    renderBarTitle();
    renderTask();
    dragandDrop();
}

/**
 * render Tasks with subtasks
 */
function renderTask() {
    let todo = document.getElementById("todo");
    //todo.innerHTML = "";
    //todo.innerHTML += barTitle(barNames[0]);

    for (let i = 0; i < allTasks.length; i++) {
        const testTasks = allTasks[i];
        renderSubtasks(i);
        chooseColor(i);
        todo.innerHTML += taskings(
            i,
            testTasks.title,
            testTasks.description,
            testTasks.category,
            subtasksLength,
            choosenCatColor
        );
        showSubtasks(i); //Shows Subtask if subtask are in the array
        renderUsers(i); //Shows user they invited for this task
    }
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

function chooseColor(num) {
    let cat = allTasks[num].category;
    for (let i = 0; i < category.length; i++) {
        const element = category[i];
        if (cat == element) {
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
function updateSubtasks() {}

function showAddTaskForm() {
    let addTask_overlap = document.getElementById("addTask_overlap");
    addTask_overlap.classList.remove("d-none");
    console.log("klick");
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
  let windHeight = document.getElementById("content").scrollHeight;
  document.getElementById('taskDetail').style.height = windHeight + "px";
  document.getElementById("taskDetail").classList.remove("d-none");
  document.getElementById("taskDetails").classList.remove("d-none");
}

function closePopUp() {
    document.getElementById("taskDetail").classList.add("d-none");
    document.getElementById("taskDetails").classList.add("d-none");
}

function renderTaskDetails(num) {}

function closeWindow() {
    let addTask_overlap = document.getElementById("addTask_overlap");
    addTask_overlap.classList.add("d-none");
}

function doNotCloseWindow(event) {
    event.stopPropagation();
}
