import { getCookie } from './utils.js';
import { enterMatchmaking } from './api.js';


const user = getCookie('user');
console.log(user);

document.getElementById('play').addEventListener('click', async () => {
    const res = await enterMatchmaking(user);
    console.log(res);
    window.location.replace('matchmaking.html');
})