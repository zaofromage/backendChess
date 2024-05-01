"use strict";
const { v4:uuidv4 } = require('uuid');
const { convertFEN } = require('./utils');


module.exports = class Game {
    constructor (player1, player2) {
        this.id = uuidv4();
        this.player1 = player1;
        this.player2 = player2;
        this.board = convertFEN('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
    }
}