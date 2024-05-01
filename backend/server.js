const { createServer } = require('node:http');
const { parse } = require('node:url');
const { getUsers, getUserByName, createUser, updateUser, deleteUser } = require('./controllers/userController');
const { getMatchmaking, getMatchmakingByName, enterMatchmaking, getOutMatchmaking } = require('./controllers/mmController');
const { getGames, getGameById, createGame, deleteGame } = require('./controllers/gameController');
const utils = require('./utils');
const gameModel = require('./models/gameModel');
const WebSocketServer = require('websocket').server;

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
    else if (req.url.match(/\/game\/(.+)/) && req.method === 'DELETE'){
        deleteGame(req, res);
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

const ws = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});
let clients = [];

ws.on('request', (request) => {
    if (!request.resourceURL.path.match(/\/\?nickname=(.+)/)) {
        request.reject();
    }
    else {
        let connection = request.accept(null, request.origin);
        clients.push({
            nickname: utils.getParams(request.resourceURL.path).get('nickname'),
            connection: connection
        });
        connection.on('open', () => console.log('Connection etablished'));
        connection.on('message', async message => {
            console.log(`Received message ${message.utf8Data}`);
            let data = null;
            try {
                data = JSON.parse(message.utf8Data);
            } catch (error) {
                data = message.utf8Data;
            }
            if (!data.id || !data.board) {
                connection.send("Wrong data");
            } else {
                try {
                    let game = await gameModel.findById(data.id);
                    let newBoard = await gameModel.update(data.id, data.board);
                    clients.find((c) => c.nickname === game.player1.nickname).connection.send(JSON.stringify({board: newBoard}));
                    clients.find((c) => c.nickname === game.player2.nickname).connection.send(JSON.stringify({board: newBoard}));
                } catch (error) {
                    console.log(error);
                }
                
            }
        })
        connection.on('close', () => {
            clients = clients.filter((c) => c.connection !== connection);
            console.log('Closed');
        });
    }  
})
