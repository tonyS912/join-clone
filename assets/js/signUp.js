
let users = [];
async function signUp() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let searchExistingEmail = users.find(u => u.email == email);
    
    if (searchExistingEmail) {
        userAlreadyExists();
    } else {
        users.push({ 'name': name, 'email': email.toLowerCase(), 'password': password });
        await pushUsersToServer();
        setTimeout(() => {
            showLoginAfterSignup();
        }, 500);
    }
}

async function pushUsersToServer() {
    await backend.setItem('users', JSON.stringify(users)); 
}


function showLoginAfterSignup() {
    window.location.href = 'index.html?msg=Du hast dich ergolreich registriert';
}


function userAlreadyExists() {
    alert('already exist');
}




function backToLogin() {
    window.location.href = 'login2.html';
}