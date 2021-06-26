//to show the status of the game
const statusDisplay = document.querySelector(".game-status");

let gameActive = true;

//to store current player
let currentPlayer = 'X';

//to store the current state of the game for easy validation
let gameState = ["", "", "", "", "", "", "", "", ""];

//winning condition
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


// Display message

//to display winner message
const winnermessage = () => `Player ${currentPlayer} has won!`;
//to display draw message
const drawmessage = () => `Draw!`;
//to display player's turn
const playerturnmessage = () => `It's ${currentPlayer}'s turn`;
//to state the current player's turn message in status bar
statusDisplay.innerText = playerturnmessage();


//Event listener

//event-listeners for all cells in grid
const cells = document.querySelectorAll(".cell");
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
//event listener for restart button
const restart = document.querySelector('.game-restart');
restart.addEventListener('click', handleRestart);



//functions

//function to check if the clicked cell has already been clicked 
//and if not, continue the game
function handleCellClick(clickedCellEvent) {
    //to save the clicked html element
    const clickedCell = clickedCellEvent.target;
    //to save the clicked cell's data-cell-index value
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    //to check whether the clicked cell has already been clicked or if the game is paused
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    //if everything is in order
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

//function to update the UI
function handleCellPlayed(clickedCell, clickedCellIndex) {
    //to set the gameState array index with clicked cell index
    gameState[clickedCellIndex] = currentPlayer;
    //to show the currentplayer's clicked tile in the UI
    clickedCell.innerHTML = currentPlayer;
}

//function for the core of the game
function handleResultValidation() {
    let winRound = false;
    for (let i = 0; i < winningCombinations.length; i++) {
        const winningCombo = winningCombinations[i];
        let a = gameState[winningCombo[0]];
        let b = gameState[winningCombo[1]];
        let c = gameState[winningCombo[2]];
        if (a === "" || b === "" || c === "") {
            continue;
        }
        if (a === b && b === c) {
            winRound = true;
            let tiles = [];
            for (let i = 0; i < 3; i++) {
                tiles.push(winningCombo[i]);
            }
            for(let i=0;i<3;i++){
                let box = cells[tiles[i]];
                box.style.backgroundColor="#77ff95";
                box.style.transition="0.8s";
            }
            break;
        }
    }
    if (winRound) {
        statusDisplay.innerHTML = winnermessage();
        statusDisplay.style.color="#22ac10";
        gameActive = false;
        return;
    }
    if (!gameState.includes("")) {
        statusDisplay.innerHTML = drawmessage();
        cells.forEach(cell=>{
            cell.style.transition="0.8s";
            cell.style.backgroundColor="#ffc4c4"}
        )
        statusDisplay.style.color="#f12828";
        gameActive = false;
        return;
    }
    handlePlayerChange();
}

//to Change players
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = playerturnmessage();
}

//function to restart game using Restart button
function handleRestart() {
    gameActive = true;
    statusDisplay.style.color="black";
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = playerturnmessage();
    cells.forEach(cell => {
        return cell.innerHTML = ""
    });
    cells.forEach(cell => {
        return cell.style.backgroundColor="transparent";
       
    });
   
  
}