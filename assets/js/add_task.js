/**
 * TODO - after click on addingTask we need moveToBoard (for faster coding commented out)
 */
async function addingTask() {
    checkInput();
    if (checkUp == true) {
        saveTaskInfo();
        allTasks.push(task);
        saveTasksInBackend();
        subtasks = [];
        assigne = [];
        clear();
        //moveToBoard();
    }
}

function checkInput() {
    let title = document.getElementById("title").value
    let description = document.getElementById("description").value;
    let date = document.getElementById("dueDate").value
    
    if (title == "", description == "", priority == "", date == "") {
        alert("Please enter a Title, Description, Date and Prio")
        checkUp = false;
    } else {
        checkUp = true;
    }
}

function saveTaskInfo() {
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let category = document.getElementById("category").innerText;
    let dueDate = document.getElementById("dueDate").value;
    task = {
        title: title,
        description: description,
        category: category,
        prio: priority,
        dueDate: dueDate,
        subtasks: subtasks,
        assignes : assigne,
    };
}

async function saveTasksInBackend() {
    setURL("https://gruppe-384.developerakademie.net/smallest_backend_ever");
    await backend.setItem("allTasks", JSON.stringify(allTasks));
    await backend.setItem("category", JSON.stringify(category));
}

function removeTasks() {
    subtasks = [];
    assigne = [];
    clear();
}

/**
 * clear task preview
 */
function clear() {
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("category").innerText = "Select task Category";
    document.getElementById("category").innerHTML += addImg();
    backgroundOff(priority);
    document.getElementById("dueDate").value = "";
    document.getElementById("subtaskName").value = "";
    document.getElementById("subtasks").innerHTML = "";
    document.getElementById("avatar").innerHTML = "";
}

/**
 * TODO - go to board send user feedback message
 */
function moveToBoard() {
    //animated message ('task added to board')
    window.location.href = "board.html";
}

/**
 * ----------------------- Section -------------------------------
 * 
 * 
 */

function addTitleHitEnter() {
    let title = document.getElementById('title');

    if (title.value != "") {
        title.addEventListener("keydown", (event) => {
                if (event.key == "Enter") {
                    document.getElementById('description').focus();
                }
            });
    }
}

/**
 * colorized the background-color of choosen priority button
 * @param {string} prio
 */
function switchBackground(prio) {
    for (i = 0; i < prioList.length; i++) {
        const pref = prioList[i];

        backgroundOff(pref);
    }

    backgroundOn(prio);
    priority = prio;
}

/**
 * switch the background-color of choosen Priority-Button "ON"
 * @param {string} prio
 */
function backgroundOn(prio) {
    if (prio != undefined) {
        document.getElementById(`${prio}`).classList.add("prio-" + `${prio}`);
        document.getElementById(`${prio}`).classList.add("prio-img");
        document
            .getElementById(`${prio}`)
            .setAttribute("onclick", `backgroundOff("${prio}")`);
    }
}

/**
 * switch the background-color of choosen Priority-Button "OFF"
 * @param {string} prio
 */
function backgroundOff(prio) {
    if (prio != "") {
        document.getElementById(`${prio}`).classList.remove("prio-img");
        document
            .getElementById(`${prio}`)
            .classList.remove("prio-" + `${prio}`);
        document
            .getElementById(`${prio}`)
            .setAttribute("onclick", `switchBackground("${prio}")`);
    }
}

/**
 * show subtask into preview and push it in own array
 */
function addSubtask() {
    let input = document.getElementById("subtaskName").value;
    let subtask = document.getElementById("subtasks");

    if (input != "") {
        subtask.innerHTML += addThisSubtask(input);
        document.getElementById("subtaskName").value = "";
        subtasks.push(input);
    }
}

/**
 * same as subtask but using with enter-key
 */
function addSubtaskHitEnter() {
    document
        .getElementById("subtaskName")
        .addEventListener("keydown", (event) => {
            if (event.key == "Enter") {
                addSubtask();
            }
        });
}

function dateChecker() {
    let today = new Date().toISOString().split('T')[0];
    
    document.getElementById('dueDate').setAttribute('min', today)
}