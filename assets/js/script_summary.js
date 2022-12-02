//add background in menu summary
function summary() {
    document.getElementById('summary').classList.add('menu_dark');
    document.getElementById('board').classList.remove('menu_dark');
    document.getElementById('addTask').classList.remove('menu_dark');
    document.getElementById('contacts').classList.remove('menu_dark');
}


//add background in menu board
function board() {
    document.getElementById('board').classList.add('menu_dark');
    document.getElementById('summary').classList.remove('menu_dark');
    document.getElementById('addTask').classList.remove('menu_dark');
    document.getElementById('contacts').classList.remove('menu_dark');
}


//add background in menu addTask
function addTask() {
    document.getElementById('addTask').classList.add('menu_dark');
    document.getElementById('summary').classList.remove('menu_dark');
    document.getElementById('board').classList.remove('menu_dark');
    document.getElementById('contacts').classList.remove('menu_dark');
}


//add background in menu contacts
function contacts() {
    document.getElementById('contacts').classList.add('menu_dark');
    document.getElementById('summary').classList.remove('menu_dark');
    document.getElementById('board').classList.remove('menu_dark');
    document.getElementById('addTask').classList.remove('menu_dark');
}