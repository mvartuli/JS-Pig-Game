/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. 
  After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, prevDice1, prevDice2, prevPlayer, winScore;

newGame();

document.querySelector(".btn-roll").addEventListener("click", function() {
    if (!gamePlaying) {
        return;
    }
    winScore = document.getElementById("inputWinScore").value;
    winScore = winScore >= 20 ? winScore : 100;
    document.getElementById("inputWinScore").value = winScore;
    console.log(winScore);

    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    if (
        prevPlayer === activePlayer &&
        ((prevDice1 === dice1 && dice1 === 6) || (prevDice2 === dice2 && dice2 === 6))
    ) {
        console.log("IF dice1=" + dice1 + " prevdice1=" + prevDice1);
        console.log("IF dice2=" + dice2 + " prevdice2=" + prevDice2);
        console.log("IF activePlayer=" + activePlayer + " prevPlayer=" + prevPlayer);
        scores[activePlayer] = 0;
        prevDice1 = 0;
        prevDice2 = 0;
        document.getElementById("score-" + activePlayer).textContent = "0";
        togglePlayer();
        return;
    } else {
        console.log("ELSE dice1=" + dice1 + " prevdice1=" + prevDice1);
        console.log("ELSE dice2=" + dice2 + " prevdice2=" + prevDice2);
        console.log("ELSE activePlayer=" + activePlayer + " prevPlayer=" + prevPlayer);
        prevDice1 = dice1;
        prevDice2 = dice2;
        prevPlayer = activePlayer;
    }

    var diceDOM1 = document.querySelector(".dice1");
    var diceDOM2 = document.querySelector(".dice2");

    diceDOM1.style.display = "block";
    diceDOM1.src = "dice-" + dice1 + ".png";

    diceDOM2.style.display = "block";
    diceDOM2.src = "dice-" + dice2 + ".png";

    if (dice1 === 1 || dice2 === 1) {
        togglePlayer();
    } else {
        roundScore += dice1 + dice2;
        document.getElementById("current-" + activePlayer).textContent = roundScore;
    }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
    if (!gamePlaying) {
        return;
    }
    scores[activePlayer] += roundScore;
    document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
    if (scores[activePlayer] >= winScore) {
        document.getElementById("name-" + activePlayer).textContent = "Winner!!";
        document.querySelector(".dice1").style.display = "none";
        document.querySelector(".dice2").style.display = "none";
        document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
        document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
        gamePlaying = false;
    } else {
        togglePlayer();
    }
});

document.querySelector(".btn-new").addEventListener("click", newGame);

function togglePlayer() {
    roundScore = 0;
    document.getElementById("current-" + activePlayer).textContent = 0;
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    activePlayer = activePlayer === 1 ? 0 : 1;
    //document.querySelector(".dice").style.display = "none";
}

function newGame() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector(".dice1").style.display = "none";
    document.querySelector(".dice2").style.display = "none";

    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
}
