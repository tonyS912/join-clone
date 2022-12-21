function categoryParam(elemnt, i) {
    return /*html*/ `<li onclick="showCategory(${i})" class="list-elements-height list-elemnt">${elemnt}</li>`;
}

function selectCat() {
    return /*html*/ '<li id="selectCat" onclick="closeCat()" class="list-elements-height list-elemnt">Select task Category</li>';
}

function addOneCat() {
    return /*html*/ '<li onclick="newCategory()" class="list-elements-height list-elemnt">New Category</li>';
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
