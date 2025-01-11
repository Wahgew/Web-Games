let dealerSum = 0;
let playerSum = 0;

let dealerAceCount = 0;
let playerAceCount = 0;

let hiddenCard;
let deck;

let gameOver = false;
let canHit = true; // checks if you can still hit if sum is <= 21

window.onload = function () {
    buildDeck();
    shuffleDeck(deck);
    startGame();
};

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]); // loops the deck Ace of Clubs to King of Clubs
        }
    }
}

function shuffleDeck(deck) {
    for (let i = 0; i < deck.length; i++) {
        const randomNumber = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[randomNumber]] = [deck[randomNumber], deck[i]];
    }
}

function startGame() {
    hiddenCard = deck.pop();
    dealerSum += getValue(hiddenCard);
    dealerAceCount += checkAce(hiddenCard);

    while (dealerSum < 17) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealerCards").append(cardImg);
    }

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        playerSum += getValue(card);
        playerAceCount += checkAce(card);
        document.getElementById("playerCards").append(cardImg);
    }
}
document.getElementById("hit").addEventListener("click", () => {
    if (!gameOver) {
        console.log("Hit button clicked!");
        hit();
    }
});

document.getElementById("stay").addEventListener("click", () => {
    if (!gameOver) {
        stay();
    }
});

function hit() {
    if (!canHit) {
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    playerSum += getValue(card);
    playerAceCount += checkAce(card);
    document.getElementById("playerCards").append(cardImg);

    if (reduceAce(playerSum, playerAceCount) === 21) {
        canHit = false;
        endGame("You hit 21! You win!");
    }

    // Check if player busts
    if (reduceAce(playerSum, playerAceCount) > 21) {
        canHit = false;
        endGame("Bust!");
    }
}

function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    playerSum = reduceAce(playerSum, playerAceCount);

    canHit = false;
    document.getElementById("hiddenCard").src = "./cards/" + hiddenCard + ".png";

    let message = "";
    if (playerSum > 21) {
        message = "Bust!";
    } else if (dealerSum > 21) {
        message = "You Win!";
    } else if (playerSum === dealerSum) {
        message = "Push...";
    } else if (playerSum > dealerSum) {
        message = "You Win!";
    } else {
        message = "You Lose!";
    }

    endGame(message);
    return message;
}

function endGame(message) {
    document.getElementById("dealerSum").innerText = dealerSum;
    document.getElementById("playerSum").innerText = playerSum;
    document.getElementById("Winner").innerText = message;

    // Disable Hit and Stay buttons
    document.getElementById("hit").disabled = true;
    document.getElementById("stay").disabled = true;

    // Add Reset button
    gameOver = true;
    document.getElementById("Winner").innerText = message;

    // Create the Reset button dynamically
    const resetButton = document.createElement("button");
    resetButton.id = "reset";
    resetButton.innerText = "Reset";
    resetButton.addEventListener("click", resetGame);

    // Append the button to the container
    document.getElementById("container").appendChild(resetButton);
}

function resetGame() {
    // Clear game state
    dealerSum = 0;
    playerSum = 0;
    dealerAceCount = 0;
    playerAceCount = 0;
    deck = [];
    gameOver = false;
    canHit = true;

    // Clear UI
    document.getElementById("Winner").innerText = "";
    document.getElementById("dealerSum").innerText = "";
    document.getElementById("playerSum").innerText = "";
    document.getElementById("dealerCards").innerHTML = '<img id="hiddenCard" src="./cards/Back.png" alt="">';
    document.getElementById("playerCards").innerHTML = "";

    // Remove Reset button
    const resetButton = document.getElementById("reset");
    if (resetButton) {
        resetButton.remove();
    }

    // Re-enable Hit and Stay buttons
    console.log("Game reset. Restarting...");
    document.getElementById("hit").disabled = false;
    document.getElementById("stay").disabled = false;

    // Restart game
    buildDeck();
    shuffleDeck(deck);
    startGame();
}

function getValue(card) {
    let data = card.split("-"); // 7-H
    let value = data[0];

    if (isNaN(value)) {
        if (value === "A") {
            return 11;
        } else {
            return 10;
        }
    }
    return parseInt(value);
}

function checkAce(card) {
    return card[0] === "A" ? 1 : 0;
}

function reduceAce(sum, aceCount) {
    while (sum > 21 && aceCount > 0) {
        sum -= 10;
        aceCount -= 1;
    }
    return sum;
}
