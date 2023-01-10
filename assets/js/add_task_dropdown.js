/**
 * Open an Dropdown that you can choose a Category
 */
function expandMenu(id) {
    let button = document.getElementById(id);

    if (button.id == "category") {
        button.classList.add("d-none");
        document.getElementById("category-list").classList.remove("d-none");
        appendCategory("category-list");
        miniMenu("assigne");
    } else {
        button.classList.add("d-none");
        document.getElementById("assigne-list").classList.remove("d-none");
        appendAssignes("assigne-list");
        checkAssigne();
        miniMenu("category");
    }
}

function expandMenuPopUp(id) {
    let button = document.getElementById(id);

    if (button.id == "popUpCategory") {
        button.classList.add("d-none");
        document.getElementById("popUpCategory-list").classList.remove("d-none");
        appendCategory("popUpCategory-list");
        miniMenu("popUpAssigne");
    } else {
        button.classList.add("d-none");
        document.getElementById("popUpAssigne-list").classList.remove("d-none");
        appendAssignes("popUpAssigne-list");
        checkAssigne();
        miniMenu("popUpCategory");
    }
}

function closeMenu(param) {
    miniMenu(param);

    if (param == "category") {
        document.getElementById("category").textContent =
            "Select task Category";
        document.getElementById("category").innerHTML += addImg();
    } else {
        document.getElementById("assigne").textContent =
            "Select contacts to assign";
        document.getElementById("assigne").innerHTML += addImg();
        checkAssigne();
    }
}

/**
 * ---------------------- Category Section ---------------------------
 */

/**
 *
 */
function appendCategory(id) {
    let cat = document.getElementById(id);
    cat.innerHTML = "";

    cat.innerHTML += selectCat();
    cat.innerHTML += addOneCat();

    for (let i = 0; i < category.length; i++) {
        const elemnt = category[i];
        let color = catColor[choosenColor[i]];

        cat.innerHTML += categoryParam(elemnt, i, color);
    }
}

/**
 * minimize categorylist
 * @param {string} param
 */
function miniMenu(param) {
    document.getElementById(`${param}`).classList.remove("d-none");
    document.getElementById(`${param}` + "-list").classList.add("d-none");
    document.getElementById("new-" + `${param}`).classList.add("d-none");
}

/**
 * minimize dropdown and shows the addCategory input
 */
function newCategory() {
    miniMenu("category");
    document.getElementById("category").classList.add("d-none");
    document.getElementById("new-category").classList.remove("d-none");
    colerCode();
}

function showCategory(i) {
    let color = catColor[choosenColor[i]];
    document.getElementById("category").innerHTML = categoryParam(category[i], i, color);
    document.getElementById("category").innerHTML += addImg();
    document.getElementById("category").firstChild.classList.remove('list-elemnt');
    miniMenu("category");
}

function addCat() {
    let newCat = document.getElementById("categoryName").value;
    let i = category.length;

    if (newCat != "") {
        category.push(newCat);
        appendCategory();
        miniMenu("category");
        document.getElementById("categoryName").value = "";
        showCategory(i);
    } else {
        miniMenu("category");
    }
}

function addCatHitEnter() {
    document
        .getElementById("categoryName")
        .addEventListener("keyup", (event) => {
            if (event.key == "Enter") {
                addCat();
            }
        });
}

function deleteCat() {
    document.getElementById("categoryName").value = "";
    document.getElementById("category").textContent = "Select task Category";
    document.getElementById("category").innerHTML += addImg();
    miniMenu("category");
}

/**
 * shows color Buttons under new Category Input
 */
function colerCode() {
    let colors = document.getElementById("colorCode");
    colors.innerHTML = "";
    for (let i = 0; i < catColor.length; i++) {
        const color = catColor[i];

        colors.innerHTML += addColorbtn(color, i);
    }
}

function colorAdd(num) {
    let newCat = document.getElementById("categoryName").value;

    if (newCat != "") {
        choosenColor.push(num)
    }
}

/**
 * --------------------- Assigned to Section ----------------------------
 */

function appendAssignes(id) {
    let assigne = document.getElementById(id);
    assigne.innerHTML = "";
    assigne.innerHTML += selectAssigne();

    for (let i = 0; i < users.length; i++) {
        const elemnt = users[i].name;

        assigne.innerHTML += assigneParam(elemnt, i);
    }
    assigne.innerHTML += inviteAssigne();
}

function newAssigne() {
    miniMenu('assigne');
    document.getElementById('assigne').classList.add('d-none');
    document.getElementById('new-assigne').classList.remove('d-none');
}

function showAssigne(num) {
    let checkbox = document.getElementById("checkbox" + num);

    if (checkbox.checked == true) {
        checkbox.checked = false;
        removeAssigneFromTask(num);
    } else {
        checkbox.checked = true;
        addAssignetoTask(num);
    }
}

function checkAssigne() {
    document.getElementById('avatar').innerHTML = "";
    for (let i = 0; i < users.length; i++) {
        let checkbox = document.getElementById("checkbox" + i);
        const element = users[i].name;
        if (assigne.includes(element)) {
            checkbox.checked = true;
            addAvatar(i);
        }
    }
}

function addAssignetoTask(num) {
    let name = users[num].name;
    //let initials = users[num].name.substring(0, 2).toUpperCase();
    if (assigne.includes(name)) {
        checkAssigne();
    } else {
        assigne.push(name);
        checkAssigne();
    }
}

function removeAssigneFromTask(num) {
    let name = users[num].name;
    let index = assigne.indexOf(name);
    if (index > -1) {
        assigne.splice(index, 1)
    }
    checkAssigne();
}

function addAvatar(num) {
    let name = users[num].name.substring(0, 2).toUpperCase();
    let color = users[num].color

    document.getElementById('avatar').innerHTML += avatar(name, color);
}