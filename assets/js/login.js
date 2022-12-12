    
    
    function load(){
        const urlParams = new URLSearchParams(window.location.search);
        const msg = urlParams.get('msg');
        if(msg){
            msgBox.innerHTML = msg;
        }
    
    }
    

function logIn(){
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let loggedUser = users.find(u => u.email == email && u.password == password);
    if(loggedUser){
       localStorage.setItem('loggedUser', email)
        window.location.href= 'summary.html'
    }else{
        window.location.href = 'index.html?msg=Email or password not correct, please try again or sign up!';

       
    }
}





function loginAsGuest() {
    // document.getElementById('email-login').value = ''; 
    // document.getElementById('password-login').value = '';
    window.location.href = 'summary.html';
    console.log('summary')
}

function showSignup() {
    window.location.href = 'signup.html';
}



function resetPasswordForm(){
    window.location.href = 'resetPassword.html';
}