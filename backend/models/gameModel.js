let games = require('../data/games');
const { writeDataToFile } = require('../utils');
const Game = require('../Game');

const findAll = () => {
    return new Promise((resolve, reject) => {
        resolve(games);
    })
}

const findById = (id) => {
    return new Promise((resolve, reject) => {
        const game = games.find((g) => g.id === id);
        resolve(game);
    })
}

const findByName = (nickname) => {
    return new Promise((resolve, reject) => {
        const game = games.find((g) => g.player1.nickname === nickname || g.player2.nickname === nickname);
        resolve(game);
    })
}

const create = (player1, player2) => {
    return new Promise((resolve, reject) => {
        let newGame = new Game(player1, player2);
        games.push(newGame);
        writeDataToFile('./data/games.json', games);
        resolve(newGame.id);
    })
}

const update = (id, board) => {
    return new Promise(async (resolve, reject) => {
        const index = games.findIndex((g) => g.id === id);
        games[index].state = games[index].state === 'w' ? 'b':'w';
        games[index].board = board;
        writeDataToFile('./data/games.json', games);
        resolve(games[index]);
    })
}

const deleteById = (id) => {
    return new Promise(async (resolve, reject) => {
        games = games.filter((g) => g.id !== id);
        writeDataToFile('./data/games.json', games);
        resolve();
    })
}

module.exports = {
    findAll,
    findById,
    findByName,
    create,
    update,
    deleteById
}