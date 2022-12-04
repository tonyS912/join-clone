setURL('https://gruppe-384.developerakademie.net/smallest_backend_ever');

async function init() {
        await downloadFromServer();
        users = await JSON.parse(backend.getItem('users')) || [];
        console.log('loaded');
       
}
