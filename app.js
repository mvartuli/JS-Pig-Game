/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. 
  After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, prevDice, prevPlayer, winScore;

newGame();

document.querySelector(".btn-roll").addEventListener("click", function () {
    if (!gamePlaying) {
        return;
    }
    winScore = document.getElementById("inputWinScore").value;
    winScore = winScore >= 20 ? winScore : 100;
    document.getElementById("inputWinScore").value = winScore;
    console.log(winScore);

    var dice = Math.floor(Math.random() * 6) + 1;
    if (prevPlayer === activePlayer && prevDice === dice && dice === 6) {
        console.log('IF dice=' + dice + ' prevdice=' + prevDice);
        console.log('IF activePlayer=' + activePlayer + ' prevPlayer=' + prevPlayer);
        scores[activePlayer] = 0;
        prevDice = 0;
        document.getElementById("score-" + activePlayer).textContent = "0";
        togglePlayer();
        return;
    } else {
        console.log('ELSE dice=' + dice + ' prevdice=' + prevDice);
        console.log('ELSE activePlayer=' + activePlayer + ' prevPlayer=' + prevPlayer);
        prevDice = dice;
        prevPlayer = activePlayer;
    }

    var diceDOM = document.querySelector(".dice");

    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    if (dice !== 1) {
        roundScore += dice;
        document.getElementById("current-" + activePlayer).textContent = roundScore;
    } else {
        togglePlayer();
    }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
    if (!gamePlaying) {
        return
    }
    scores[activePlayer] += roundScore;
    document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
    if (scores[activePlayer] >= winScore) {
        document.getElementById('name-' + activePlayer).textContent = 'Winner!!'
        document.querySelector(".dice").style.display = "none";
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
    } else {
        togglePlayer();
    }
});

document.querySelector(".btn-new").addEventListener("click", newGame);

function togglePlayer() {
    roundScore = 0;
    document.getElementById("current-" + activePlayer).textContent = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    activePlayer = activePlayer === 1 ? 0 : 1;
    document.querySelector(".dice").style.display = "none";
}

function newGame() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector(".dice").style.display = "none";

    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

