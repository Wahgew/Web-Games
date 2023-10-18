const playerText = document.querySelector("#playerText");
const computerText = document.querySelector("#computerText");
const winnerText = document.querySelector("#winnerText");
const buttonChoice = document.querySelectorAll(".buttonChoice");

let player;
let computer;
let winner;

/*
  Button clickables
*/
buttonChoice.forEach(button => button.addEventListener("click", () => {
    player = button.textContent;
    computerTurn();
    playerText.textContent = `Player: ${player}`;
    computerText.textContent = `Computer: ${computer}`;
    winnerText.textContent = assignWinner();
}));


document.getElementById("rockImage").addEventListener("click", function() {
    var rockImage = document.getElementById("rockImage");

    if(rockImage.src.endsWith("realrocktransparent.png")) {
        rockImage.src = "rock.png";

    } else {
        rockImage.src = "realrocktransparent.png";
    }

});

// Computer RPS Turn & AI
function computerTurn() {
    const randomNumber = Math.floor(Math.random() * 3);

    switch(randomNumber) {
        case 0:
            computer = "ROCK";
            break;
        case 1:
            computer = "PAPER";
            break;
        case 2:
            computer = "SCISSORS";
            break;        
    }
}

// Display the Winner
function assignWinner() {
    if (player == computer) {
        return "Draw!";
    } else if (
        (player === "ROCK" && computer === "SCISSORS") ||
        (player === "PAPER" && computer === "ROCK") ||
        (player === "SCISSORS" && computer === "PAPER")
    ) {
        return "Player Wins!";
    } else {
        return "Computer Wins!";
    }
}