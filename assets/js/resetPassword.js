async function init() {
    setURL('https://gruppe-384.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    users = await JSON.parse(backend.getItem('users')) || [];
}

function backToLogin(){
    window.location.href = 'login2.html';
}

function loadMessage() {
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('msg');
    if (msg) {
        msgBox.innerHTML = msg;
    }
}
function sendEmail(){
    let email = document.getElementById('email').value;
    let searchExistingEmail = users.find(u => u.email == email);
    if(searchExistingEmail) {
        window.location.href = 'resetPassword.html?msg=Email sent, check your Inbox.';
    }else{
        event.preventDefault();
        window.location.href = 'resetPassword.html?msg=Email not found.';
    }
}


function resetPassword() {

    const urlParams = new URLSearchParams(window.location.search);
    let email = urlParams.get('msg');

    let pw1 = document.getElementById('pw1').value;
    let pw2 = document.getElementById('pw2').value;

    checkValue(email, pw1, pw2);
}



async function checkValue(email, pw1, pw2) {
    let searchExistingEmail = users.find(u => u.email == email);
    if (!searchExistingEmail && !email) {
       alert('email not found')
    }else if (pw1 == pw2) {

        await setNewPasswordForUser(email, pw1);
        window.location.href = 'index.html?msg=Your password has been succesfully reset';
        
    }else {
    
        alert('pw not equal')
    }
}

async function setNewPasswordForUser(email, password) {
    let passwordChanged = false;
    for (i = 0; i < users.length; i++) {
      if (users[i]['email'].toLowerCase() == email.toLowerCase()) {
        users[i]['password'] = password;
        passwordChanged = true; // new Password is set
        await backend.setItem('users', JSON.stringify(users)); //users-array is saved into backend
      }
    }
    return passwordChanged; //If changed "true" is returned, else it stays "false"
  }



