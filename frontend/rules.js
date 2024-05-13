/**
 * 
 * @param {*} board matrix 8*8
 * @param {*} move object { x, y, dX, dY }
 */
export const isLegal = (board, move) => {
    if (isSameColor(board, move)) return false;
    if (isSamePosition(board, move)) return false;
    if (pieceMoves(board, move) === undefined) return false;
    return true;
}

function isSameColor(board, move) {
    const {x, y, dx, dy} = move;
    if (board[dx][dy] === '') return false;
    return ((board[x][y] === board[x][y].toUpperCase() && board[dx][dy] === board[dx][dy].toUpperCase()) || 
        (board[x][y] === board[x][y].toLowerCase() && board[dx][dy] === board[dx][dy].toLowerCase()))
}

function isSamePosition(board, move) {
    const {x, y, dx, dy} = move;
    return x === dx && y === dy;
}

function pawnPossible(board, move) {
    const {x, y, dx, dy} = move;
    let possible = [];
    if (isWhite(board[x][y])) {
        if (board[x-1][y] === '') possible.push({dx: x-1, dy: y});
        if (board[x-1][y+1] !== '') possible.push({dx: x-1, dy: y+1});
        if (board[x-1][y-1] !== '') possible.push({dx: x-1, dy: y-1});
    } else {
        if (board[x+1][y] === '') possible.push({dx: x+1, dy: y});
        if (board[x+1][y-1] !== '') possible.push({dx: x+1, dy: y-1});
        if (board[x+1][y+1] !== '') possible.push({dx: x+1, dy: y+1});
    }
    return possible.find(m => m.dx === dx && m.dy === dy);
}

function pieceMoves(board, move) {
    const {x, y, dx, dy} = move;
    switch(board[x][y].toLowerCase()) {
        case 'p' : return pawnPossible(board, move);
        default : return true;
    }
}

function isWhite(piece) {
    return piece === piece.toUpperCase();
}