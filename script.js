setURL('https://gruppe-384.developerakademie.net/smallest_backend_ever');

async function init() {
        await downloadFromServer();
        users = await JSON.parse(backend.getItem('users')) || [];
   
}


function showLogOut() {
        let log_out = document.getElementById('log_out');
        if (log_out.classList.contains('d-none')) {
            log_out.style.animation = 'fade_in 0.5s ease-in-out';
            log_out.classList.remove('d-none');
        } else {
            log_out.style.animation = 'fade_out 0.5s ease-out';
            setTimeout(() => {
                log_out.classList.add('d-none');
            }, 400);
        }
        console.log('logout')
    }
