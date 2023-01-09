var menuIsOpen = false


//add background in menu summary
function summary() { 
    document.getElementById('summary').classList.add('menu_dark');
    document.getElementById('board').classList.remove('menu_dark');
    document.getElementById('addTask').classList.remove('menu_dark');
    document.getElementById('contacts').classList.remove('menu_dark');
    window.location.href = 'summary.html';
}


//add background in menu board
function board() {
    document.getElementById('board').classList.add('menu_dark');
    document.getElementById('summary').classList.remove('menu_dark');
    document.getElementById('addTask').classList.remove('menu_dark');
    document.getElementById('contacts').classList.remove('menu_dark');
    window.location.href = 'board.html';
}


//add background in menu addTask
function addTask() {
    document.getElementById('addTask').classList.add('menu_dark');
    document.getElementById('summary').classList.remove('menu_dark');
    document.getElementById('board').classList.remove('menu_dark');
    document.getElementById('contacts').classList.remove('menu_dark');
    window.location.href = 'add_task.html';
}


//add background in menu contacts
function contacts() {
    document.getElementById('contacts').classList.add('menu_dark');
    document.getElementById('summary').classList.remove('menu_dark');
    document.getElementById('board').classList.remove('menu_dark');
    document.getElementById('addTask').classList.remove('menu_dark');
    window.location.href = 'contacts.html';
}


//open legal notice
function legal() {
    document.getElementById('legal').classList.add('menu_dark');
    document.getElementById('contacts').classList.remove('menu_dark');
    document.getElementById('summary').classList.remove('menu_dark');
    document.getElementById('board').classList.remove('menu_dark');
    document.getElementById('addTask').classList.remove('menu_dark');
    window.location.href = 'legal.html';
}


//open hel site
function help() {
    document.getElementById('help').classList.add('d-none');
    window.location.href = 'help.html';
}


//show log out
function user() {

    if (menuIsOpen) {
        document.getElementById('log_out').classList.add('d-none-float');
        document.getElementById('log_out').classList.remove('d-flex-float');
        menuIsOpen = false;
    } else {
        document.getElementById('log_out').classList.remove('d-none-float');
        document.getElementById('log_out').classList.add('d-flex-float');
        menuIsOpen = true;
    }
}


//user log out
function logOut() {
    window.location.href = 'index.html';
    localStorage.clear();
}


function greetUser() {
    //greetAccordingToDayTime();
    greetUserName();

}

function greetAccordingToDayTime() {
    //greeting according to current daytime
}

function greetUserName() {
    let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if (loggedUser) {
        document.getElementById('loggedUserName').innerHTML = loggedUser['name'];
    } else {
        document.getElementById('loggedUserName').innerHTML = 'Guest';
    }
}

