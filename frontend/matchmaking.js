import { getMatchmaking, createGame, getGameByName } from "./api.js";
import { getCookie } from "./utils.js";

const user = getCookie('user');
console.log(user);


setInterval( async () => {
    let mm = await getMatchmaking();
    console.log(mm);
    mm = mm.filter(u => u.nickname !== user);
    let potentialGame = null;
    try {
        potentialGame = await getGameByName(user);
        console.log(potentialGame);
    } catch (error) {
        console.log(error);
    }
    if (potentialGame.id) {
        document.cookie = `id=${potentialGame.id}`;
        console.log('Found a game');
        window.location.replace('game.html');
    }
    else if (mm.length >= 1) {
        const game = await createGame(user, mm[0].nickname);
        document.cookie = `id=${game.id}`;
        console.log(game);
        window.location.replace('game.html');
    }
}, 1000);