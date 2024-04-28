const { createServer } = require('node:http');
const { parse } = require('node:url');
const { getUsers, getUserByName, createUser, updateUser, deleteUser } = require('./controllers/userController');
const { getMatchmaking, getMatchmakingByName, enterMatchmaking, getOutMatchmaking } = require('./controllers/mmController');
const { getGames, getGameById, createGame } = require('./controllers/gameController');
const utils = require('./utils');

const hostname = '127.0.0.1';
const port = 5500;

const server = createServer((req, res) => {
    // user part
    if (req.url === '/users' && req.method === 'GET'){
        getUsers(req, res);
    }
    else if (req.url.match(/\/users\/(.+)/) && req.method === 'GET') {
        getUserByName(req, res);
    }
    else if (req.url.match(/\/users\/(.+)/) && req.method === 'PUT') {
        updateUser(req, res);
    }
    else if (req.url === '/users' && req.method === 'POST'){
        createUser(req, res);
    }
    else if (req.url.match(/\/users\/(.+)/) && req.method === 'DELETE') {
        deleteUser(req, res);
    }
    // matchmaking part
    else if (req.url === '/matchmaking' && req.method === 'GET'){
        getMatchmaking(req, res);
    }
    else if (req.url.match(/\/matchmaking\/(.+)/) && req.method === 'GET'){
        getMatchmakingByName(req, res);
    }
    else if (req.url.match(/\/enter-matchmaking\?nickname=(.+)/) && req.method === 'GET'){
        enterMatchmaking(req, res);
    }
    else if (req.url.match(/\/matchmaking\/(.+)/) && req.method === 'DELETE'){
        getOutMatchmaking(req, res);
    }
    //game part
    else if (req.url === '/games' && req.method === 'GET'){
        getGames(req, res);
    }
    else if (req.url.match(/\/game\/(.+)/) && req.method === 'GET'){
        getGameById(req, res);
    }
    else if (req.url.match(/\/create-game\?player1=(.+)\&player2=(.+)/) && req.method === 'GET'){
        createGame(req, res);
    }
    // wrong url
    else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message : 'Route not found'}));
    }
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});