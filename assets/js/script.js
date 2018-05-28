// 1. Basic Setup
// 2. Determine Winner
// 3. Basic AI and winner notification
// 4. Minimax algorithm!

var originBoard;
const humanPlayer = '0';
const aiPlayer = 'X';

const winCombos = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]

];

const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
    document.querySelector(".endgame").style.display = "none";
    originBoard = Array.from(Array(9).keys());
    // console.log(originBoard);
    for (let i = 0; i < cells.length; i++) {

        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);

    }
}

function turnClick(square) {
    // console.log(square.target.id);
    turn(square.target.id, humanPlayer);
}

function turn(squareId, player) {
    originBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    // Determine Winner
    let gameWinner = checkWinner(originBoard, player);
    if (gameWinner) gameOver(gameWinner);
}

// funcion de verificacion de Winner
function checkWinner(board, player) {
    let plays = board.reduce((acumulate, element, index) =>
        (element === player)) ? acumulate.concat(index) : acumulate, [];
    let gameWinner = null;
    for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.indexOf(elem > -1))) {
            gameWinner = {index: index, player: player};
            break;
        }
    }
    return gameWinner;
}

