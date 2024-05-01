const gameModel = require('../models/gameModel');
const userModel = require('../models/userModel');
const mmModel   = require('../models/mmModel');
const { getPostData, getParams } = require('../utils');

// @desc Get all games
// @route GET /games
const getGames = async (req, res) => {
    try {
        const games = await gameModel.findAll();

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(games));
    } catch (error) {
        console.log(error);
    }
}

// @desc Get a game from its id
// @route GET /games/[the name]
const getGameById = async (req, res) => {
    try {
        const game = await gameModel.findById(req.url.split('/')[2]);

        if (!game) {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'Game not found'}));
        }
        else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(game));
        }

    } catch (error) {
        console.log(error);
    }
}

// @desc create a game with two players and remove then from the queue
// @route GET /game/create-game?player1=[name]&player2=[name]
const createGame = async (req, res) => {
    try {
        const params = getParams(req.url);
        console.log(params);
        const player1 = await mmModel.findByName(params.get('player1'));
        const player2 = await mmModel.findByName(params.get('player2'));
        if (!player1 || !player2) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({message : "Player 1 or 2 not found in matchmaking queue"}))
        }
        else {
            await mmModel.deleteByName(player1.nickname);
            await mmModel.deleteByName(player2.nickname);
            const id = await gameModel.create(player1, player2);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: `Game between ${player1.nickname} and ${player2.nickname} successfully created`,
                id: id
            }
            ));
        }
    } catch (error) {
        console.log(error);
    }
}

// @desc delete a game by its id
// @route DELETE /game/[id]
const deleteGame = async (req, res) => {
    try {
        const game = await gameModel.findById(req.url.split('/')[2]);
        if (!game) {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'Game not found'}));
        }
        else {
            await gameModel.deleteById(game.id);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: "game has been successfully removed"}));
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getGames,
    getGameById,
    createGame,
    deleteGame
}