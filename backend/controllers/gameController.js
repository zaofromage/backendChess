const gameModel = require('../models/gameModel');
const userModel = require('../models/userModel');
const mmModel   = require('../models/mmModel');
const { getPostData, getParams, random } = require('../utils');

// @desc Get all games
// @route GET /games
const getGames = async (req, res) => {
    try {
        const games = await gameModel.findAll();

        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
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
            res.writeHead(404, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify({message: 'Game not found'}));
        }
        else {
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify(game));
        }

    } catch (error) {
        console.log(error);
    }
}

const getGameByName = async (req ,res) => {
    try {
        const game = await gameModel.findByName(getParams(req.url).get('nickname'));

        if (!game) {
            res.writeHead(404, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify({message: 'Game not found'}));
        }
        else {
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
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
        const player1 = await mmModel.findByName(params.get('player1'));
        const player2 = await mmModel.findByName(params.get('player2'));
        if (!player1 || !player2) {
            res.writeHead(404, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify({message : "Player 1 or 2 not found in matchmaking queue"}))
        }
        else {
            await mmModel.deleteByName(player1.nickname);
            await mmModel.deleteByName(player2.nickname);
            const player1color = ['w', 'b'][random(2)];
            const player2color = player1color === 'w' ? 'b' : 'w';
            const gamePlayer1 = {
                nickname: player1.nickname,
                elo: player1.elo,
                color: player1color
            };
            const gamePlayer2 = {
                nickname: player2.nickname,
                elo: player2.elo,
                color: player2color
            };
            const id = await gameModel.create(gamePlayer1, gamePlayer2);
            res.writeHead(201, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
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
            res.writeHead(404, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify({message: 'Game not found'}));
        }
        else {
            await gameModel.deleteById(game.id);
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify({message: "game has been successfully removed"}));
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getGames,
    getGameById,
    getGameByName,
    createGame,
    deleteGame
}