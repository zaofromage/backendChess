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

const create = (player1, player2) => {
    return new Promise((resolve, reject) => {
        let newGame = new Game(player1, player2);
        games.push(newGame);
        writeDataToFile('./data/games.json', games);
        resolve(newGame.id);
    })
}

module.exports = {
    findAll,
    findById,
    create
}