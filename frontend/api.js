const url = 'http://10.188.198.5:5500';

const getUsers = async () => {
    let req = await fetch(`${url}/users`);
    let users = await req.json();
    return users;
}

const getUserByName = async (nickname) => {
    let req = await fetch(`${url}/users/${nickname}`, { mode: 'no-cors' });
    let user = await req.json();
    return user;
}

const updateUser = async (nickname, newData) => {
    let req = await fetch(`${url}/users/${nickname}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
    });
    let res = await req.json();
    return res;
}

const createUser = async (user) => {
    let req = await fetch(`${url}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
        body: JSON.stringify(user)
    });
    let res = await req.json();
    return res;
}

const deleteUser = async (nickname) => {
    let req = await fetch(`${url}/users/${nickname}`, { method: 'DELETE' });
    let res = await req.json();
    return res;
}

const getMatchmaking = async () => {
    let req = await fetch(`${url}/matchmaking`);
    let res = await req.json();
    return res;
}

const getMatchmakingByName = async (nickname) => {
    let req = await fetch(`${url}/matchmaking/${nickname}`);
    let res = await req.json();
    return res;
}

const enterMatchmaking = async (nickname) => {
    let req = await fetch(`${url}/enter-matchmaking?nickname${nickname}`);
    let res = await req.json();
    return res;
}

const getOutMatchmaking = async (nickname) => {
    let req = await fetch(`${url}/matchmaking/${nickname}`, { method: 'DELETE' });
    let res = await req.json();
    return res;
}

const getGames = async () => {
    let req = await fetch(`${url}/games`);
    let res = await req.json();
    return res;
}

const getGameById = async (id) => {
    let req = await fetch(`${url}/game/${id}`);
    let res = await req.json();
    return res;
}

const createGame = async (player1, player2) => {
    let req = await fetch(`${url}/create-game?player1=${player1}&player2=${player2}`);
    let res = await req.json();
    return res;
}

const deleteGame = async (id) => {
    let req = await fetch(`${url}/game/${id}`, { method: 'DELETE' });
    let res = await req.json();
    return res;
}

export default {
    getUsers,
    getUserByName,
    updateUser,
    createUser,
    deleteUser,
    getMatchmaking,
    getMatchmakingByName,
    enterMatchmaking,
    getOutMatchmaking,
    getGameById,
    getGames,
    createGame,
    deleteGame
}