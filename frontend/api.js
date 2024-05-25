const url = 'http://192.168.1.69:5500';

export const getUsers = async () => {
    let req = await fetch(`${url}/users`);
    let users = await req.json();
    return users;
}

export const getUserByName = async (nickname) => {
    let req = await fetch(`${url}/users/${nickname}`);
    let user = await req.json();
    return user;
}

export const updateUser = async (nickname, newData) => {
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

export const createUser = async (user) => {
    let req = await fetch(`${url}/users`, {
        method: 'POST',
        body: JSON.stringify(user)
    });
    let res = await req.json();
    return res;
}

export const deleteUser = async (nickname) => {
    let req = await fetch(`${url}/users/${nickname}`, {
        method: 'DELETE'
    });
    let res = await req.json();
    return res;
}

export const getMatchmaking = async () => {
    let req = await fetch(`${url}/matchmaking`);
    let res = await req.json();
    return res;
}

export const getMatchmakingByName = async (nickname) => {
    let req = await fetch(`${url}/matchmaking/${nickname}`);
    let res = await req.json();
    return res;
}

export const enterMatchmaking = async (nickname) => {
    let req = await fetch(`${url}/enter-matchmaking?nickname=${nickname}`);
    let res = await req.json();
    return res;
}

export const getOutMatchmaking = async (nickname) => {
    let req = await fetch(`${url}/get-out-matchmaking?nickname=${nickname}`);
    let res = await req.json();
    return res;
}

export const getGames = async () => {
    let req = await fetch(`${url}/games`);
    let res = await req.json();
    return res;
}

export const getGameById = async (id) => {
    let req = await fetch(`${url}/game/${id}`);
    let res = await req.json();
    return res;
}

export const getGameByName = async (name) => {
    let req = await fetch(`${url}/game?nickname=${name}`);
    let res = await req.json();
    return res;
}

export const createGame = async (player1, player2) => {
    let req = await fetch(`${url}/create-game?player1=${player1}&player2=${player2}`);
    let res = await req.json();
    return res;
}

export const deleteGame = async (id) => {
    let req = await fetch(`${url}/game/${id}`, { method: 'DELETE' });
    let res = await req.json();
    return res;
}
