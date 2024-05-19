import { getOutMatchmaking } from "./api.js";
import { getCookie, hostname, convertFEN } from "./utils.js";
import { isLegal } from "./rules.js";

console.log(document.cookie);

const user = getCookie('user');
const id   = getCookie('id');
const fps  = 25;
let player = null;
let state = 'w';
let board  = convertFEN('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
let preBoard = convertFEN('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
let prePos = null;
let mousePosX;
let mousePosY;
let mouseDownID = -1;
let selected = undefined;

await getOutMatchmaking(user);

let ws = null;

let canvas = document.querySelector("#chess");
let ctx = canvas.getContext("2d");
const tileSize = canvas.width/8;
//load images
const pawnWhite = new Image();
pawnWhite.src = "1x/w_pawn_1x_ns.png"

const pawnBlack = new Image();
pawnBlack.src = "1x/b_pawn_1x_ns.png"

const bishopWhite = new Image();
bishopWhite.src = "1x/w_bishop_1x_ns.png"

const bishopBlack = new Image();
bishopBlack.src = "1x/b_bishop_1x_ns.png"

const knightWhite = new Image();
knightWhite.src = "1x/w_knight_1x_ns.png"

const knightBlack = new Image();
knightBlack.src = "1x/b_knight_1x_ns.png"

const rookWhite = new Image();
rookWhite.src = "1x/w_rook_1x_ns.png"

const rookBlack = new Image();
rookBlack.src = "1x/b_rook_1x_ns.png"

const queenWhite = new Image();
queenWhite.src = "1x/w_queen_1x_ns.png"

const queenBlack = new Image();
queenBlack.src = "1x/b_queen_1x_ns.png"

const kingWhite = new Image();
kingWhite.src = "1x/w_king_1x_ns.png"

const kingBlack = new Image();
kingBlack.src = "1x/b_king_1x_ns.png"

function send(move) {
    ws.send(JSON.stringify({
        id: id,
        board: board,
        move: move
    }));
    update();
};


function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function getMouseBoardPos () {
    return {
        y : round(mousePosX)/tileSize,
        x : round(mousePosY)/tileSize
    };
}

function drawPiece (piece, x, y) {
    switch (piece) {
        case 'P': ctx.drawImage(pawnWhite, x, y, tileSize, tileSize); break;
        case 'R': ctx.drawImage(rookWhite, x, y, tileSize, tileSize); break;
        case 'N': ctx.drawImage(knightWhite, x, y, tileSize, tileSize); break;
        case 'B': ctx.drawImage(bishopWhite, x, y, tileSize, tileSize); break;
        case 'Q': ctx.drawImage(queenWhite, x, y, tileSize, tileSize); break;
        case 'K': ctx.drawImage(kingWhite, x, y, tileSize, tileSize); break;
        case 'p': ctx.drawImage(pawnBlack, x, y, tileSize, tileSize); break;
        case 'r': ctx.drawImage(rookBlack, x, y, tileSize, tileSize); break;
        case 'n': ctx.drawImage(knightBlack, x, y, tileSize, tileSize); break;
        case 'b': ctx.drawImage(bishopBlack, x, y, tileSize, tileSize); break;
        case 'q': ctx.drawImage(queenBlack, x, y, tileSize, tileSize); break;
        case 'k': ctx.drawImage(kingBlack, x, y, tileSize, tileSize); break;
    }
}

function getPiece() {
    const pos = getMouseBoardPos();
    return board[pos.x][pos.y];
}

function whileMouseDown() {
    update();
    drawPiece(selected, mousePosX-(tileSize/2), mousePosY-(tileSize/2));
}

function mousedown() {
    const pos = getMouseBoardPos();
    if (mouseDownID === -1 && board[pos.x][pos.y] !== ""){
        selected = getPiece();
        prePos = {x: pos.x, y: pos.y};
        preBoard = JSON.parse(JSON.stringify(board));
        board[pos.x][pos.y] = '';
        mouseDownID = setInterval(whileMouseDown, fps);
    }
}

function mouseup() {
    if(mouseDownID !== -1) {
        clearInterval(mouseDownID);
        const pos = getMouseBoardPos();
        const move =  { x:prePos.x, y:prePos.y, dx:pos.x, dy:pos.y};
        if (isLegal(preBoard, move, player, state)){
            if ((selected === 'p' || selected === 'P') && (pos.x === 0 || pos.x === 7)) {

                board[pos.x][pos.y] = promote();
            } else {
                board[pos.x][pos.y] = selected;
            }
            send(move);
        }
        else {
            board[prePos.x][prePos.y] = selected;
            update();
        }
        selected = undefined;
        mouseDownID = -1;
    }
}

function update() {
    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
            if (i%2 == 0){
                if (j%2 == 0){
                    ctx.fillStyle = "rgb(225, 225, 225)"
                    ctx.fillRect(i*tileSize, j*tileSize, tileSize, tileSize);
                }
                else{
                    ctx.fillStyle = "rgb(0, 0, 0)"
                    ctx.fillRect(i*tileSize, j*tileSize, tileSize, tileSize);
                }
            }
            else {
                if (j%2 == 1){
                    ctx.fillStyle = "rgb(225, 225, 225)"
                    ctx.fillRect(i*tileSize, j*tileSize, tileSize, tileSize);
                }
                else{
                    ctx.fillStyle = "rgb(0, 0, 0)"
                    ctx.fillRect(i*tileSize, j*tileSize, tileSize, tileSize);
                }
            }
        }
    }
    board.map((row, i) => {
        row.map((piece, j) => {
            if (piece !== ""){
                drawPiece(piece, j*tileSize, i*tileSize);
            }
        });
    });
};

function round (val) {
    return val - val%tileSize
}

function promote() {
    if (selected === 'p') return 'q';
    if (selected === 'P') return 'Q';
}

canvas.addEventListener("mousemove", (evt) => {
    let mousePos = getMousePos(canvas, evt);
    mousePosX = mousePos.x;
    mousePosY = mousePos.y;
});

canvas.addEventListener("mousedown", () => {
    mousedown();
})

canvas.addEventListener("mouseup", () => {
    mouseup();
})

const setUpWs = () => {
    try {
        ws = new WebSocket(`ws://${hostname}/?nickname=${user}`);
        console.log(ws);
        ws.onmessage = message => {
            let game = JSON.parse(message.data);
            player = game.player1.nickname === user ? game.player1 : game.player2;
            board = game.board;
            state = game.state;
            update();
            console.log(state);
        }
    } catch (error) {
        console.log(error);
    }
}

setTimeout(setUpWs, 1000);
update();

