let allTasks = [];
let task = [];
let subtasks = [];
let category = ["Sales", "Backoffice", "Marketing", "Coding"];
let assigne = [];
const catColor = [
    "#8AA4FF",
    "#FF0000",
    "#2AD300",
    "#FF8A00",
    "#E200BE",
    "#0038FF",
];
const prioList = ["urgent", "medium", "low"];
let priority = "";
let choosenColor = [1, 4, 2, 5];
let checkUp = "";

window.addEventListener("keyup", addCatHitEnter);
window.addEventListener("keyup", addSubtaskHitEnter);
window.addEventListener("keyup", addTitleHitEnter);

async function loadTasks() {
    await loadTasksFromBackend();
}

async function loadTasksFromBackend() {
    setURL("https://gruppe-384.developerakademie.net/smallest_backend_ever");
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem("allTasks")) || [];
    choosenColor = JSON.parse(backend.getItem("choosenColor")) || [1, 4, 2, 5];
    category = JSON.parse(backend.getItem("category")) || [
        "Sales",
        "Backoffice",
        "Marketing",
        "Coding",
    ];
    users = JSON.parse(backend.getItem("contacts")) || [
        {
            uuid: "8942e28a-4448-4c07-9ee9-0ae04e32557e",
            name: "Hans Peter",
            email: "hans@peter.foo",
            phone: "01601023123",
            color: "f0d311",
        },
        {
            uuid: "8942e28a-3442-4c07-9ee9-0ae04e32557e",
            name: "Senior Erpel",
            email: "erpel@teasd.de",
            phone: "01601022343123",
            color: "a0a311",
        },
    ];
}