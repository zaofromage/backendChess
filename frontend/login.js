import api from './api.js';

document.getElementById('l-submit').addEventListener('click', async () => {
    const user = await api.getUserByName(document.getElementById('l-nickname').value);
    console.log(user);
    if (!user) {
        document.getElementById('l-error').textContent = 'Wrong nickname';
    } else if (user.password !== document.getElementById('l-password').value) {
        document.getElementById('l-error').textContent = 'Wrong password';
    } else {
        window.location.replace('menu.html')
    }
});

document.getElementById('r-submit').addEventListener('click', async () => {
    const user = {
        nickname: document.getElementById('r-nickname').value,
        password: document.getElementById('r-password').value,
        elo: 500
    }
    const creation = await api.createUser(user);
    if (creation.message) {
        document.getElementById('l-error').textContent = creation.message;
    } else {
      window.location.replace('menu.html');  
    }
});