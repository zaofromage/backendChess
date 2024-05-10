import { getOutMatchmaking } from "./api.js";
import { getCookie, hostname } from "./utils.js";

console.log(document.cookie);

const user = getCookie('user');
const id   = getCookie('id');

await getOutMatchmaking(user);

let ws = null;

const setUpWs = () => {
    try {
        ws = new WebSocket(`ws://${hostname}/?nickname=${user}`);
        console.log(ws);
        ws.onmessage = message => console.log(message.data);
    } catch (error) {
        console.log(error);
    }
}

setTimeout(setUpWs, 1000);

document.getElementById('send').addEventListener('click', () => {
    ws.send(JSON.stringify({
        id: id,
        board: [["","","","","","","",""],["","","","","","","",""],["","","","","","","",""],["","","","","","","",""],["","","","","","","",""],["","","","","","","",""],["P","P","P","P","P","P","P","P"],["R","N","B","Q","K","B","N","R"]]
    }));
})