// Game State
let gameState = {
    board: ['', '', '', '', '', '', '', '', ''],
    currentPlayer: 'X',
    gameActive: true,
    gameMode: 'pvp', // 'pvp' or 'ai'
    scores: {
        X: 0,
        O: 0,
        draw: 0
    }
};

// Winning combinations
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// DOM Elements
const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('gameStatus');
const resetBtn = document.getElementById('resetBtn');
const newGameBtn = document.getElementById('newGameBtn');
const playAgainBtn = document.getElementById('playAgainBtn');
const gameOverlay = document.getElementById('gameOverlay');
const resultTitle = document.getElementById('resultTitle');
const resultMessage = document.getElementById('resultMessage');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');
const scoreDrawElement = document.getElementById('scoreDraw');
const modeBtns = document.querySelectorAll('.mode-btn');
const winningLine = document.getElementById('winningLine');

// Initialize game
function init() {
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetBtn.addEventListener('click', resetGame);
    newGameBtn.addEventListener('click', newGame);
    playAgainBtn.addEventListener('click', playAgain);
    modeBtns.forEach(btn => btn.addEventListener('click', handleModeChange));
    updateScoreDisplay();
}

// Handle cell click
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState.board[clickedCellIndex] !== '' || !gameState.gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();

    // AI move if in AI mode and game is still active
    if (gameState.gameMode === 'ai' && gameState.currentPlayer === 'O' && gameState.gameActive) {
        setTimeout(makeAIMove, 500);
    }
}

// Handle cell played
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState.board[clickedCellIndex] = gameState.currentPlayer;
    clickedCell.textContent = gameState.currentPlayer;
    clickedCell.classList.add('taken');
    clickedCell.classList.add(gameState.currentPlayer.toLowerCase());
}

// Handle result validation
function handleResultValidation() {
    let roundWon = false;
    let winningCombination = null;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const a = gameState.board[winCondition[0]];
        const b = gameState.board[winCondition[1]];
        const c = gameState.board[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            winningCombination = winCondition;
            break;
        }
    }

    if (roundWon) {
        handleWin(winningCombination);
        return;
    }

    const roundDraw = !gameState.board.includes('');
    if (roundDraw) {
        handleDraw();
        return;
    }

    handlePlayerChange();
}

// Handle win
function handleWin(winningCombination) {
    gameState.gameActive = false;
    gameState.scores[gameState.currentPlayer]++;
    updateScoreDisplay();

    // Highlight winning cells
    winningCombination.forEach(index => {
        cells[index].classList.add('winning');
    });

    // Draw winning line
    drawWinningLine(winningCombination);

    // Show result overlay
    setTimeout(() => {
        const playerName = gameState.gameMode === 'ai' && gameState.currentPlayer === 'O' ? 'AI' : `Player ${gameState.currentPlayer}`;
        resultTitle.textContent = `${playerName} Wins!`;
        resultMessage.textContent = '🎉 Congratulations! 🎉';
        gameOverlay.classList.add('show');
    }, 1000);
}

// Draw winning line
function drawWinningLine(combination) {
    const line = winningLine.querySelector('line');
    const boardRect = document.getElementById('gameBoard').getBoundingClientRect();
    const cellSize = cells[0].getBoundingClientRect();

    let x1, y1, x2, y2;

    // Calculate line coordinates based on winning combination
    const startCell = cells[combination[0]].getBoundingClientRect();
    const endCell = cells[combination[2]].getBoundingClientRect();

    x1 = startCell.left - boardRect.left + startCell.width / 2;
    y1 = startCell.top - boardRect.top + startCell.height / 2;
    x2 = endCell.left - boardRect.left + endCell.width / 2;
    y2 = endCell.top - boardRect.top + endCell.height / 2;

    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke-dasharray', '1000');
    line.setAttribute('stroke-dashoffset', '1000');

    winningLine.classList.add('show');
}

// Handle draw
function handleDraw() {
    gameState.gameActive = false;
    gameState.scores.draw++;
    updateScoreDisplay();

    setTimeout(() => {
        resultTitle.textContent = "It's a Draw!";
        resultMessage.textContent = '🤝 Well played! 🤝';
        gameOverlay.classList.add('show');
    }, 500);
}

// Handle player change
function handlePlayerChange() {
    gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
    updateGameStatus();
}

// Update game status
function updateGameStatus() {
    if (gameState.gameMode === 'ai' && gameState.currentPlayer === 'O') {
        gameStatus.textContent = "AI's Turn";
    } else {
        gameStatus.textContent = `Player ${gameState.currentPlayer}'s Turn`;
    }
}

// Update score display
function updateScoreDisplay() {
    scoreXElement.textContent = gameState.scores.X;
    scoreOElement.textContent = gameState.scores.O;
    scoreDrawElement.textContent = gameState.scores.draw;
}

// Reset game (clear board, keep scores)
function resetGame() {
    gameState.board = ['', '', '', '', '', '', '', '', ''];
    gameState.currentPlayer = 'X';
    gameState.gameActive = true;
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken', 'x', 'o', 'winning');
    });

    winningLine.classList.remove('show');
    gameOverlay.classList.remove('show');
    updateGameStatus();
}

// New game (reset everything including scores)
function newGame() {
    gameState.scores = { X: 0, O: 0, draw: 0 };
    updateScoreDisplay();
    resetGame();
}

// Play again (same as reset)
function playAgain() {
    resetGame();
}

// Handle mode change
function handleModeChange(event) {
    const selectedMode = event.target.getAttribute('data-mode');
    
    if (selectedMode === gameState.gameMode) {
        return;
    }

    gameState.gameMode = selectedMode;
    
    modeBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    newGame();
}

// AI Logic
function makeAIMove() {
    if (!gameState.gameActive) {
        return;
    }

    // Try to win
    let move = findBestMove('O');
    
    // Try to block player from winning
    if (move === -1) {
        move = findBestMove('X');
    }
    
    // Take center if available
    if (move === -1 && gameState.board[4] === '') {
        move = 4;
    }
    
    // Take a corner
    if (move === -1) {
        const corners = [0, 2, 6, 8];
        const availableCorners = corners.filter(index => gameState.board[index] === '');
        if (availableCorners.length > 0) {
            move = availableCorners[Math.floor(Math.random() * availableCorners.length)];
        }
    }
    
    // Take any available space
    if (move === -1) {
        const availableMoves = gameState.board
            .map((cell, index) => cell === '' ? index : null)
            .filter(index => index !== null);
        move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    if (move !== -1) {
        const cell = cells[move];
        handleCellPlayed(cell, move);
        handleResultValidation();
    }
}

// Find best move for AI
function findBestMove(player) {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        const cells = [gameState.board[a], gameState.board[b], gameState.board[c]];
        
        // Check if two cells have the player's mark and one is empty
        const playerCount = cells.filter(cell => cell === player).length;
        const emptyCount = cells.filter(cell => cell === '').length;
        
        if (playerCount === 2 && emptyCount === 1) {
            // Return the empty cell index
            if (gameState.board[a] === '') return a;
            if (gameState.board[b] === '') return b;
            if (gameState.board[c] === '') return c;
        }
    }
    
    return -1;
}

// Initialize the game when DOM is loaded
init();
