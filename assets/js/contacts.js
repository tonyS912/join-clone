let CONTACTS = ["8942e28a-4448-4c07-9ee9-0ae04e32557e","Hans Peter", "hans@peter.foo", "f0a311"]; // [UUID, name, email, phone, color]

// CSS Classes Manipulation
function newContactOpenOverlay() {
    document.getElementById('body__css-contactsAdd').classList.remove('hide');
}

function editContactOpenOverlay() {
    document.getElementById('body__css-contactsEdit').classList.remove('hide');
}

function closeAddPopup() {
    document.getElementById('body__css-contactsAdd').classList.add('hide');
}

function closeEditPopup() {
    document.getElementById('body__css-contactsEdit').classList.add('hide');
}

// Event Listener for form submit
addEventListener('submit', (e) => {

    if (e.target.id == "addContactForm") {
        pushNewContact();
        e.preventDefault();
    }
    if (e.target.id == "editContactForm") {
        console.log("edit Contact triggered");
        e.preventDefault();
    }
});

function pushNewContact() {
    const name = document.getElementById("id-newContact__name").value;
    const email = document.getElementById("id-newContact__email").value;
    const phone = document.getElementById("id-newContact__phone").value;
    const uuid = createContactUUID();
    const color = createColor();
    CONTACTS.push([uuid, name, email, phone, color]);
    syncContactsToServer();
}

//hex color generator
function createColor() {
    return Math.floor(Math.random() * 16777215).toString(16);
}

// UUID Generator - caution: not 100% unique, but does the job.
function createContactUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function syncContactsToServer() {
    // Sync Contact Array to Server DB
    console.log("Server Sync triggered");
}

function renderSingleContactCard(uuid) {
    let contactColor =  "";
    let contactName = "";
    let contactEmail = "";

    for (let i=0; i < CONTACTS.length; i++) {
        if (CONTACTS[i][0] == uuid) {
            contactName = CONTACTS[i][1]
            contactEmail = CONTACTS[i][2]
            contactColor = CONTACTS[i][4]
        }
    }

    let contactInitials = contactName.substring(0,2).toUpperCase();
        
    return /*html*/ `
        <div id="contact--${uuid}" class="contact--left__card" onclick="contactsLeftOpenEdit("${uuid}")">
            <div class="contact--left__UserAvatar" style="background-color:${contactColor}">
                <span class="contact-initials">${contactInitials}</span>
            </div>
            <div class="contact--left__UserText">
                <div class="contact--left__UserText--Name">${contactName}</div>
                <div class="contact--left__UserText--Email">${contactEmail}</div>
            </div>
        </div>
    `;
}

function renderLeft(uuid) {
    let renderedhtml = renderSingleContactCard(uuid)
    document.getElementById('id-contacts--main__left').innerHTML = renderedhtml;
}