const barNames = ["To do", "in progress", "Awaiting feedback", "Done"];
const barIDs = ["todo", "inProgress", "awaitFeedback", "done"];
let taskPosition = [];
let subtasksLength = "";
const urgent = "./assets/img/arrows-up.svg";
const medium = "./assets/img/equal-sign.svg";
const low = "./assets/img/arrows-down.svg";
let choosenCatColor = "";

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
    innerHTMLCheck(todo, testTasks);
    showSubtasks(i); //Shows Subtask if subtask are in the array
    renderUsers(i); //Shows user they invited for this task
}

function innerHTMLCheck(todo, testTasks) {
    todo.innerHTML += taskings(
        i,
        testTasks.title,
        testTasks.description,
        testTasks.category,
        subtasksLength,
        choosenCatColor,
        prio = priority
    );
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

function showAddTaskForm() {
    let addTask_overlap = document.getElementById("addTask_overlap");
    addTask_overlap.classList.remove("d-none");
}

function renderUsers(num) {
    let member = document.getElementById(`taskUser${num}`);
    member.innerHTML = "";
    let counter = 0;

    for (let i = 0; i < allTasks[num].assignes.length; i++) {
        const assigne = allTasks[num].assignes[i];
        if (counter < 2) {
            renderAllUser(assigne, member);
            counter++
        } else if (counter == 2) {
            renderOnlyTwoUser(member, num);
            counter++
        } else if (counter > 3) {
            break
        }
    }
}

function renderOnlyTwoUser(member, num) {
    let number = allTasks[num].assignes.length - 2;
    let name = `${number}+`
    let userColor = "000000"
    member.innerHTML += taskUser(name, userColor);
}

function renderAllUser(assigne, member) {
    for (let i = 0; i < users.length; i++) {
        let thisUser = users[i];
        if (thisUser.name == assigne) {
            let userColor = thisUser.color;
            let name = assigne.substring(0, 2).toUpperCase();
            member.innerHTML += taskUser(name, userColor);
        }
    }

}

function showThisTask(num) {
    document.getElementById("taskDetail").classList.remove("d-none");
    document.getElementById("taskDetails").classList.remove("d-none");
    renderCurTask(num);
 }

function renderCurTask(num) {
    let curTask = allTasks[num];
    document.getElementById('popUp-category').innerHTML = curTask['category'];
    document.getElementById('popUp-title').innerHTML = curTask['title'];
    document.getElementById('popUp-description').innerHTML = curTask['description'];
    document.getElementById('popUp-date').innerHTML = curTask['dueDate'];
    document.getElementById('popUp-prio').innerHTML = curTask['prio'];
    //document.getElementById('prio').innerHTML += /*html*/ `<img src="./assets/img/arrows-down.svg" class="paddingL20">`;
    renderAssignes(num);
    editCurTask(num);
    
    
}


function editCurTask(num) {
    document.getElementById('edit-btn').onclick = function () {
        document.getElementById('editTaskWindow').classList.remove('d-none');
        document.getElementById("taskDetails").classList.add("d-none");
        renderEditTaskForm(num);
    }
}

 function renderEditTaskForm(num) {
    let curTask = allTasks[num];
    document.getElementById('edit-title').value = curTask['title'];
    document.getElementById('edit-description').value = curTask['description'];
    document.getElementById('edit-dueDate').value = curTask['dueDate'];
    document.getElementById('ok').onclick = function(){
         getNewValueForCurTask(num);
    }
   
}

function getNewValueForCurTask(num){
   let deleted = allTasks.splice(num, 1);
   console.log('deleted', deleted);
   editTask();
}

//nur so viele <p>-Tags werden generiert, wie im curTask['assignes']-Array enthalten sind
function renderAssignes(num) {
    let curTask = allTasks[num];
    const container = document.querySelector('.assignes');
    container.innerHTML = "";  // Clear any existing paragraphs

    for (let i = 0; i < curTask.assignes.length; i++) {
        const name = curTask.assignes[i];
        const initials = name.substring(0, 2).toUpperCase();
        let color = findUserColor(name);
        container.innerHTML += taskUserwithName(initials, color, name);
    }
}

function findUserColor(name) {
    for (let i = 0; i < users.length; i++) {
        const userName = users[i].name;
        if (userName == name) {
            return color = users[i].color;
        }
    }
}


function closePopUp() {
    document.getElementById("taskDetail").classList.add("d-none");
    document.getElementById("taskDetails").classList.add("d-none");
    document.getElementById("editTaskWindow").classList.add("d-none");
}

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