import { getUserByName, createUser } from './api.js';

const url = 'http://127.0.0.1:5500';

document.getElementById('l-submit').addEventListener('click', async () => {
    const user = await getUserByName(document.getElementById('l-nickname').value);
    if (!user.nickname) {
        document.getElementById('l-error').textContent = 'Wrong nickname';
    } else if (user.password !== document.getElementById('l-password').value) {
        document.getElementById('l-error').textContent = 'Wrong password';
    } else {
        document.cookie = `user=${user.nickname}`;
        console.log(document.cookie)
        setTimeout(() => window.location.replace('menu.html'), 3000);
    }
});

document.getElementById('r-submit').addEventListener('click', async () => {
    const user = {
        nickname: document.getElementById('r-nickname').value,
        password: document.getElementById('r-password').value,
        elo: 500
    }
    const creation = await createUser(user);
    if (!creation.message) {
        document.cookie = `user=${creation.nickname}`;
        window.location.replace('menu.html');
    }
    else {
        document.getElementById('r-error').textContent = creation.message;
    }
});
