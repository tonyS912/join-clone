function categoryParam(elemnt, i, color) {
    return /*html*/ `<div class="list-elements-height list-elemnt" onclick="showCategory(${i})"><li class="list-elements-height">${elemnt}</li><div id="color${i}" class="color-btn2" style="background-color: ${color}"></div></div>`;
}

function categoryParamPopUp(elemnt, i, color) {
    return /*html*/ `<div class="list-elements-height list-elemnt" onclick="showCategoryPopUp(${i})"><li class="list-elements-height">${elemnt}</li><div id="color${i}" class="color-btn2" style="background-color: ${color}"></div></div>`;
}

function assigneParam(name, i) {
    return /*html*/ `<div id="assigne${i}" onclick="showAssigne(${i})" class="list-elements-height list-elemnt space"><li class="list-elements-height">${name}</li><input class="checkbox" onclick="showAssigne(${i})" type="checkbox" id="checkbox${i}"/></div>`;
}

function assigneParamPopUp(name, i) {
    return /*html*/ `<div id="assigne${i}" onclick="showAssignePopUp(${i})" class="list-elements-height list-elemnt space"><li class="list-elements-height">${name}</li><input class="checkbox" onclick="showAssigne(${i})" type="checkbox" id="checkbox${i}"/></div>`;
}

function selectAssigne() {
    return /*HTML*/ `<div class="list-elemnts-height"><li onclick="closeMenu('assigne')" class="list-elements-height list-elemnt space">Select contacts to assign<img class="popup-arrow" src="./assets/img/dropdown-arrow.svg"></img></li></div>`;
}

function selectAssignePopUp() {
    return /*HTML*/ `<div class="list-elemnts-height"><li onclick="closeMenu('popUpAssigne')" class="list-elements-height list-elemnt space">Select contacts to assign<img class="popup-arrow" src="./assets/img/dropdown-arrow.svg"></img></li></div>`;
}

function inviteAssigne() {
    return /*HTML*/ `<div class="list-elemnts-height"><li onclick="newAssigne()" class="list-elements-height list-elemnt space">Invite new contact<img class="size" src="./assets/img/contacts2.svg"></img></li></div>`;
}

function inviteAssignePopUp() {
    return /*HTML*/ `<div class="list-elemnts-height"><li onclick="newAssignePopUp()" class="list-elements-height list-elemnt space">Invite new contact<img class="size" src="./assets/img/contacts2.svg"></img></li></div>`;
}

function selectCat() {
    return /*html*/ `<div class="list-elemnts-height"><li id="selectCat" onclick="closeMenu('category')" class="list-elements-height list-elemnt space">Select task Category<img class="popup-arrow" src="./assets/img/dropdown-arrow.svg"></img></li></div>`;
}

function selectCatPopUp() {
    return /*html*/ `<div class="list-elemnts-height"><li id="selectCatPopUp" onclick="closeMenu('popUpCategory')" class="list-elements-height list-elemnt space">Select task Category<img class="popup-arrow" src="./assets/img/dropdown-arrow.svg"></img></li></div>`;
}

function addOneCat() {
    return /*html*/ '<li onclick="newCategory()" class="list-elements-height list-elemnt">New Category</li>';
}

function addOneCatPopUp() {
    return /*html*/ '<li onclick="newCategoryPopUp()" class="list-elements-height list-elemnt">New Category</li>';
}

function addImg() {
    return /*HTML*/ '<img class="popup-arrow" src="./assets/img/dropdown-arrow.svg"></img>';
}

function addThisSubtask(aktion) {
    return /*html*/ `<div class="subtasks">
    <input
        class="checkbox"
        type="checkbox"
        name="Subtasks"
        id=""
    />
    <p class="light padding-10">
        ${aktion}
    </p>
</div>`;
}

function addColorbtn(color, i) {
    return /*html*/ `<div id="color(${i})" onclick="colorAdd(${i})" class="color-btn" style="background-color: ${color};"></div>`;
}

function avatar(name, color) {
    return /*html*/ `<div class="contact--left__UserAvatar margin-10r" style="background-color: #${color} !Important">
    <span class="contact-initials">${name}</span>
</div>`;
}
