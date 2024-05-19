/**
 * 
 * @param {*} board matrix 8*8
 * @param {*} move object { x, y, dx, dy }
 */
export const isLegal = (board, move, player, state) => {
    if (!isTurn(player, state)) return false;
    if (!isMyColor(player, board, move)) return false;
    if (isSameColor(board, move)) return false;
    if (isSamePosition(board, move)) return false;
    if (pieceMoves(board, move).find(m => m.dx === move.dx && m.dy === move.dy) === undefined) return false;
    return true;
}

function isTurn(player, state) {
    return player.color === state;
}

function isMyColor(player, board, move) {
    const { x, y } = move;
    if (player.color === 'w') return isWhite(board[x][y]);
    else return !isWhite(board[x][y]);
}

function isSameColor(board, move) {
    const { x, y, dx, dy } = move;
    if (board[dx][dy] === '') return false;
    return ((board[x][y] === board[x][y].toUpperCase() && board[dx][dy] === board[dx][dy].toUpperCase()) || 
        (board[x][y] === board[x][y].toLowerCase() && board[dx][dy] === board[dx][dy].toLowerCase()))
}

function isSamePosition(board, move) {
    const { x, y, dx, dy } = move;
    return x === dx && y === dy;
}

function pawnPossible(board, move) {
    const { x, y } = move;
    let possible = [];
    if (isWhite(board[x][y])) {
        if (x === 6 && board[x-1][y] === '' && board[x-2][y] === '') possible.push({dx: x-2, dy: y});
        if (board[x-1][y] === '') possible.push({dx: x-1, dy: y});
        if (y+1 < 8 && board[x-1][y+1] !== '') possible.push({dx: x-1, dy: y+1});
        if (y-1 >= 0 && board[x-1][y-1] !== '') possible.push({dx: x-1, dy: y-1});
    } else {
        if (x === 1 && board[x+1][y] === '' && board[x+2][y] === '') possible.push({dx: x+2, dy: y});
        if (board[x+1][y] === '') possible.push({dx: x+1, dy: y});
        if (y-1 >= 0 && board[x+1][y-1] !== '') possible.push({dx: x+1, dy: y-1});
        if (y+1 < 8 && board[x+1][y+1] !== '') possible.push({dx: x+1, dy: y+1});
    }
    return possible;
}

function rookPossible(board, move) {
    const { x, y } = move;
    let possible = [];
    let i = x - 1;
    while (i >= 0 && board[i][y] === '') {
        possible.push({dx : i, dy: y});
        i--;
    }
    if (i >= 0 && isOpposite(board[i][y], board[x][y])) possible.push({dx: i, dy: y});
    i = x + 1;
    while (i < 8 && board[i][y] === '' ) {
        possible.push({dx : i, dy: y});
        i++;
    }
    if (i < 8 && isOpposite(board[i][y], board[x][y])) possible.push({dx: i, dy: y});
    i = y - 1;
    while (i >= 0 && board[x][i] === '') {
        possible.push({dx : x, dy: i});
        i--;
    }
    if (i >= 0 && isOpposite(board[x][i], board[x][y])) possible.push({dx: x, dy: i});
    i = y + 1;
    while (i < 8 && board[x][i] === '') {
        possible.push({dx : x, dy: i});
        i++;
    }
    if (i < 8 && isOpposite(board[x][i], board[x][y])) possible.push({dx: x, dy: i});
    return possible;
}

function bishopPossible(board, move) {
    const { x, y } = move;
    let possible = [];
    let i = x - 1;
    let j = y - 1;
    while ((i >= 0 && j >= 0) && board[i][j] === '') {
        possible.push({dx: i, dy:j});
        i--;
        j--;
    }
    if (i >= 0 && j >= 0 && isOpposite(board[i][j], board[x][y])) possible.push({dx: i, dy: j});
    i = x - 1;
    j = y + 1;
    while ((i >= 0 && j < 8) && board[i][j] === '') {
        possible.push({dx: i, dy:j});
        i--;
        j++;
    }
    if (i >= 0 && j < 8 && isOpposite(board[i][j], board[x][y])) possible.push({dx: i, dy: j});
    i = x + 1;
    j = y - 1;
    while ((i < 8 && j >= 0) && board[i][j] === '') {
        possible.push({dx: i, dy:j});
        i++;
        j--;
    }
    if (i < 8 && j >= 0 && isOpposite(board[i][j], board[x][y])) possible.push({dx: i, dy: j});
    i = x + 1;
    j = y + 1;
    while ((i < 8 && j < 8) && board[i][j] === '') {
        possible.push({dx: i, dy:j});
        i++;
        j++;
    }
    if (i < 8 && j < 8 && isOpposite(board[i][j], board[x][y])) possible.push({dx: i, dy: j});
    return possible;
}

function queenPossible(board, move) {
    const { x, y } = move;
    let possible = [];
    let i = x - 1;
    let j = y - 1;
    while ((i >= 0 && j >= 0) && board[i][j] === '') {
        possible.push({dx: i, dy:j});
        i--;
        j--;
    }
    if (i >= 0 && j >= 0 && isOpposite(board[i][j], board[x][y])) possible.push({dx: i, dy: j});
    i = x - 1;
    j = y + 1;
    while ((i >= 0 && j < 8) && board[i][j] === '') {
        possible.push({dx: i, dy:j});
        i--;
        j++;
    }
    if (i >= 0 && j < 8 && isOpposite(board[i][j], board[x][y])) possible.push({dx: i, dy: j});
    i = x + 1;
    j = y - 1;
    while ((i < 8 && j >= 0) && board[i][j] === '') {
        possible.push({dx: i, dy:j});
        i++;
        j--;
    }
    if (i < 8 && j >= 0 && isOpposite(board[i][j], board[x][y])) possible.push({dx: i, dy: j});
    i = x + 1;
    j = y + 1;
    while ((i < 8 && j < 8) && board[i][j] === '') {
        possible.push({dx: i, dy:j});
        i++;
        j++;
    }
    if (i < 8 && j < 8 && isOpposite(board[i][j], board[x][y])) possible.push({dx: i, dy: j});
    i = x - 1;
    while (i >= 0 && board[i][y] === '') {
        possible.push({dx : i, dy: y});
        i--;
    }
    if (i >= 0 && isOpposite(board[i][y], board[x][y])) possible.push({dx: i, dy: y});
    i = x + 1;
    while (i < 8 && board[i][y] === '' ) {
        possible.push({dx : i, dy: y});
        i++;
    }
    if (i < 8 && isOpposite(board[i][y], board[x][y])) possible.push({dx: i, dy: y});
    i = y - 1;
    while (i >= 0 && board[x][i] === '') {
        possible.push({dx : x, dy: i});
        i--;
    }
    if (i >= 0 && isOpposite(board[x][i], board[x][y])) possible.push({dx: x, dy: i});
    i = y + 1;
    while (i < 8 && board[x][i] === '') {
        possible.push({dx : x, dy: i});
        i++;
    }
    if (i < 8 && isOpposite(board[x][i], board[x][y])) possible.push({dx: x, dy: i});
    return possible;
}

function knightPossible(board, move) {
    const { x, y } = move;
    let possible = [];
    if (x-2 >= 0 && y-1 >= 0 && (isOpposite(board[x-2][y-1], board[x][y]) || board[x-2][y-1] === '')) possible.push({dx: x-2, dy: y-1});
    if (x-2 >= 0 && y+1 < 8 && (isOpposite(board[x-2][y+1], board[x][y]) || board[x-2][y+1] === '')) possible.push({dx: x-2, dy: y+1});
    if (x+2 < 8 && y-1 >= 0 && (isOpposite(board[x+2][y-1], board[x][y]) || board[x+2][y-1] === '')) possible.push({dx: x+2, dy: y-1});
    if (x+2 < 8 && y+1 < 8 && (isOpposite(board[x+2][y+1], board[x][y]) || board[x+2][y+1] === '')) possible.push({dx: x+2, dy: y+1});
    if (x-1 >= 0 && y-2 >= 0 && (isOpposite(board[x-1][y-2], board[x][y]) || board[x-1][y-2] === '')) possible.push({dx: x-1, dy: y-2});
    if (x+1 < 8 && y-2 >= 0 && (isOpposite(board[x+1][y-2], board[x][y]) || board[x+1][y-2] === '')) possible.push({dx: x+1, dy: y-2});
    if (x-1 >= 0 && y+2 < 8 && (isOpposite(board[x-1][y+2], board[x][y]) || board[x-1][y+2] === '')) possible.push({dx: x-1, dy: y+2});
    if (x+1 < 8 && y+2 < 8 && (isOpposite(board[x+1][y+2], board[x][y]) || board[x+1][y+2] === '')) possible.push({dx: x+1, dy: y+2});
    return possible;
}

function kingPossible(board, move) {
    const { x, y } = move;
    let possible = [];
    for (let i = x-1; i <= x+1; i++) {
        for (let j = y-1; j <= y+1; j++) {
            if (0 <= i && i < 8 && 0 <= j && j < 8) {
                possible.push({dx: i, dy: j});
            }
        }
    }
    return possible;
}

function pieceMoves(board, move) {
    const { x, y } = move;
    switch(board[x][y].toLowerCase()) {
        case 'p' : return pawnPossible(board, move);
        case 'r' : return rookPossible(board, move);
        case 'b' : return bishopPossible(board, move);
        case 'q' : return queenPossible(board, move);
        case 'n' : return knightPossible(board, move);
        case 'k' : return kingPossible(board, move);
        default : return true;
    }
}

function isWhite(piece) {
    return piece === piece.toUpperCase();
}

function isOpposite(piece1, piece2) {
    return isWhite(piece1) !== isWhite(piece2);
}

function getKing(color) {
    let x = null;
    let y = null;
    
}