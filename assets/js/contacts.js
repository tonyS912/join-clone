let CONTACTS = [["8942e28a-4448-4c07-9ee9-0ae04e32557e", "Hans Peter", "hans@peter.foo", "01601023123", "f0a311"], ["8942e28a-3442-4c07-9ee9-0ae04e32557e", "Senior Erpel", "erpel@teasd.de", "01601022343123", "d0a311"]]; // [UUID, name, email, phone, color]
let renderedhtml = "";

// CSS Classes Manipulation
function newContactOpenOverlay() {
    document.getElementById('body__css-contactsAdd').classList.remove('hide');
    document.getElementById('body__overlapID').classList.remove('hide');
}

function editContactOpenOverlay() {
    document.getElementById('body__css-contactsEdit').classList.remove('hide');
    document.getElementById('body__overlapID').classList.remove('hide');
}

function closeAddPopup() {
    document.getElementById('body__css-contactsAdd').classList.add('hide');
    document.getElementById('body__overlapID').classList.add('hide');

}

function closeEditPopup() {
    document.getElementById('body__css-contactsEdit').classList.add('hide');
    document.getElementById('body__overlapID').classList.add('hide');

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


function arrayToJson() {
    let CONTACTSJSON = [];
    for (let i = 0; i < CONTACTS.length; i++) {
        let contactUuid = CONTACTS[i][0];
        let contactName = CONTACTS[i][1];
        let contactEmail = CONTACTS[i][2];
        let contactPhone = CONTACTS[i][3];
        let contactColor = CONTACTS[i][4];
        pushContactData = {
            'uuid': contactUuid,
            'name': contactName,
            'email': contactEmail,
            'phone': contactPhone,
            'color': contactColor
        };
        CONTACTSJSON.push(pushContactData)
    }
    return CONTACTSJSON;
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
    setURL('https://gruppe-384.developerakademie.net/smallest_backend_ever');
    render();
    console.log("Server Sync triggered");
    pushContacts();
}

async function pushContacts() {
    const ParsedJson = arrayToJson()
    console.log(ParsedJson);
    await backend.setItem('contacts', JSON.stringify(ParsedJson));
}

function renderSingleContactCard(uuid) {
    console.log(uuid);
    let contactColor = "";
    let contactName = "";
    let contactEmail = "";

    for (let i = 0; i < CONTACTS.length; i++) {
        if (CONTACTS[i][0] == uuid) {
            contactName = CONTACTS[i][1]
            contactEmail = CONTACTS[i][2]
            contactColor = CONTACTS[i][4]
            console.log(contactColor);
        }
    }

    let contactInitials = contactName.substring(0, 2).toUpperCase();

    return /*html*/ `
        <div id="contact--${uuid}" class="contact--left__card" onclick='contactOpen("${uuid}")'>
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
    renderedHtmlTemp = renderSingleContactCard(uuid);
    renderedhtml += renderedHtmlTemp;
    document.getElementById('id-contacts--card').innerHTML = renderedhtml;
}

function render() {
    for (let i = 0; i < CONTACTS.length; i++) {
        const renderContactCard = CONTACTS[i][0];
        renderLeft(renderContactCard);
    }
    renderedhtml = "";

}

function contactOpen(uuid) {
    const renderedContactsHtml = renderedHtmlContactRight(uuid);
    document.getElementById('id-contacts--main__rightCenter').innerHTML = renderedContactsHtml;
}

function renderContactOverviewRight() {
}


function renderedHtmlContactRight(uuid) {

    let contactColor = "";
    let contactName = "";
    let contactEmail = "";
    let contactPhone = "";

    for (let i = 0; i < CONTACTS.length; i++) {
        if (CONTACTS[i][0] == uuid) {
            contactName = CONTACTS[i][1]
            contactEmail = CONTACTS[i][2]
            contactPhone = CONTACTS[i][3]
            contactColor = CONTACTS[i][4]
        }
    }

    let contactInitials = contactName.substring(0, 2).toUpperCase();

    return /*html*/ `
<div class="contacs--show__right--header">
    <div id="id-contacts__initials" style="background-color:${contactColor}" class="contacs--show__right--header__userPic">${contactInitials}</div>
    <div class="contacs--show__right--header__userNameAddTask">
        <div id="id-contacts__name" class="contacs--show__right--header__userNameText">${contactName}</div>
        <div onclick="">+ Add Task</div>
    </div>
</div>
<div class="contacs--show__right--contactInformation">
    <div class="contacs--show__right--contactInformation__Text">Contact Information</div>
    <div class="contacs--show__right--contactInformation__EditContact" onclick='editContactOverlay("${uuid}")'><img src="assets/img/edit.png">Edit Contact</div>
</div>
<div class="contacs--show__right--ContainerBoldText">Email</div>
<div id="id-contacts__email">${contactEmail}</div>
<div class="contacs--show__right--ContainerBoldText">Phone</div>
<div id="id-contacts__phone">${contactPhone}</div>
<div>
<button class="contacts--main__rightBox--newContactButton"
    onclick="newContactOpenOverlay()">New
    contact<img class="padding-5" src="/assets/img/add_user.svg" /></button>
</div>
`;
}

function editContactOverlay(uuid) {
    editContactOpenOverlay();

}