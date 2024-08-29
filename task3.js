// JavaScript to handle the tic-tac-toe game logic
document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const resetButton = document.getElementById("reset-button");
    let isXTurn = true; // X starts first
    let board = Array(9).fill(null); // Represents the board state

    // Winning combinations for tic-tac-toe
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Handle cell click
    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            const index = cell.getAttribute("data-index");

            // Check if cell is already filled
            if (board[index] || checkWin()) {
                return;
            }

            // Update board and cell
            board[index] = isXTurn ? "X" : "O";
            cell.textContent = board[index];
            cell.style.pointerEvents = "none";

            // Check for win or draw
            if (checkWin()) {
                setTimeout(() => alert(`${isXTurn ? "O" : "X"} wins!`), 10);
                endGame();
            } else if (board.every(cell => cell !== null)) {
                setTimeout(() => alert("It's a draw!"), 10);
                endGame();
            }

            // Switch turn
            isXTurn = !isXTurn;
        });
    });

    // Check for a win
    function checkWin() {
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    }

    // End the game by disabling further clicks
    function endGame() {
        cells.forEach(cell => cell.style.pointerEvents = "none");
    }

    // Reset the game
    resetButton.addEventListener("click", () => {
        board.fill(null);
        cells.forEach(cell => {
            cell.textContent = "";
            cell.style.pointerEvents = "auto";
        });
        isXTurn = true;
    });
});
