var dealerSum = 0;
var playerSum = 0;

var dealerAceCount = 0;
var playerAceCount = 0;

var hiddenCard;
var deck;

var canHit = true; // checks if you can still hit if sum is <= 21

window.onload = function() {
    buildDeck();
    shuffleDeck(deck);
    startGame();
}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]); // loops the deck Ace of Clubs to King of Clubs
        }
    }
    //console.log(deck);
}

function shuffleDeck(deck) {
    for (let i = 0; i < deck.length; i++) {
        const randomNumber = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[randomNumber]] = [deck[randomNumber], deck[i]];
    }
    console.log(deck);
}

function startGame() {
    hiddenCard = deck.pop();
    dealerSum += getValue(hiddenCard);
    dealerAceCount += checkAce(hiddenCard);
    // console.log(hiddenCard);
    // console.log(dealerSum);

    while (dealerSum < 17) {
        //img
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealerCards").append(cardImg);
    }
    console.log(dealerSum);

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        playerSum += getValue(card);
        playerAceCount += checkAce(card);
        document.getElementById("playerCards").append(cardImg);
    }
    console.log(playerSum);
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);

}

function hit() {
    if(!canHit) {
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    playerSum += getValue(card);
    playerAceCount += checkAce(card);
    document.getElementById("playerCards").append(cardImg);

    if (reduceAce(playerSum, playerAceCount) > 21) {
        canHit = false;
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
    } else if (playerSum === 21 && dealerSum !== 21) {
        message = "You Win!";
    } else if (playerSum !== 21 && dealerSum === 21) {
        message = "You Lose!";
    } else if (playerSum > dealerSum) {
        message = "You Win!";
    } else {
        message = "You Lose!";
    }


    document.getElementById("dealerSum").innerText = dealerSum;
    document.getElementById("playerSum").innerText = playerSum;
    document.getElementById("Winner").innerText = message;
}


// try to make one return statement
function getValue(card) {
    let data = card.split("-") // 7-H 
    let value = data[0];

    if (isNaN(value)) { // A J Q K
        if (value == "A") {
            return 11;
        } else {
            return 10;
        }
    }
    return parseInt(value);
}

function checkAce(card) {
    let digit = card[0];

    if (digit == "A") {
        digit = 1;
    } else {
        digit = 0;
    }
    return digit;
}

function reduceAce(playerSum, playerAceCount) {
    while(playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}