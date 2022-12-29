
//show pop-up new Task
function addTask() {
    document.getElementById('addTaskFloat').classList.add('show_addtask');
}


//close pop-up new Task
function closeAddTask() {
    document.getElementById('addTaskFloat').classList.remove('show_addtask')
}


//create a Task
function createTask() {
    document.getElementById('createTask').classList.add('show_create_task');
    setTimeout(() => {
        document.getElementById('createTask').classList.remove('show_create_task')
    }, 2000);
    setTimeout(() => {
        document.getElementById('addTaskFloat').classList.remove('show_addtask')
    }, 2000);
   // closeAddTask()
}


function extendCategory() {
    document.getElementById('categorySimply').classList.add('d-none');
    document.getElementById('categoryExtend').classList.add('d-flex');
}

function closeCategory() {
    document.getElementById('categorySimply').classList.remove('d-none');
    document.getElementById('categoryExtend').classList.remove('d-flex');
}
