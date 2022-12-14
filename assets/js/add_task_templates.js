function categoryParam(elemnt) {
    return /*html*/ `<li class="list-elemnt">${elemnt}</li>`;
}

function selectCat() {
    return /*html*/ '<li onclick="miniCategory()" class="list-elemnt">Select task Category</li>';
}

function addOneCat() {
    return /*html*/ '<li id="addOneCat" onclick="changeCategory()" class="list-elemnt">New Category</li>';
}

