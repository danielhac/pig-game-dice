/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, previousDice, previousDice2, winningScore, player0, player1;

init();

document.addEventListener('DOMContentLoaded',function() {
    document.querySelector('input[id="name-change0"]').onchange=changeEventHandler;
    document.querySelector('input[id="name-change1"]').onchange=changeEventHandler1;
},false);

function changeEventHandler(event) {
    player0 = event.target.value;
    console.log(player0);
}

function changeEventHandler1(event) {
    player1 = event.target.value;
    console.log(player1);
}

// when clicking on the roll dice button
document.querySelector('.btn-roll').addEventListener('click', function () {

    // check if winner
    if(gamePlaying) {
        // randomized number for dice (1-6)
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        console.log(dice);

        // display dice
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'initial';
        diceDOM.src = 'dice-' + dice + '.png';
        // display dice2
        var diceDOM2 = document.querySelector('.dice2');
        diceDOM2.style.display = 'initial';
        diceDOM2.src = 'dice-' + dice2 + '.png';

        console.log('Previous dice: '+previousDice[0]);
        console.log('Previous dice2: '+previousDice2[0]);

        // if current dice roll and previous roll is both a 6 or 3, next player
        if( (dice === 6 && previousDice[0] === 6) || (dice === 3 && previousDice[0] === 3) ||
            (dice2 === 6 && previousDice2[0] === 6) || (dice2 === 3 && previousDice2[0] === 3) ) {
                previousDice = [];
                previousDice2 = [];
                console.log(previousDice);
                nextPlayer();
            } else if(dice !== 1 || dice2 !== 1) {
                // if normal
                roundScore += dice;
                previousDice.pop();
                previousDice.push(dice);

                roundScore += dice2;
                previousDice2.pop();
                previousDice2.push(dice2);
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            } else {
                // if rolled a 1, new player
                previousDice.pop();
                previousDice2.pop();
                nextPlayer();
            }
            // }

    }
});

// when clicking on hold button
document.querySelector('.btn-hold').addEventListener('click', function () {
    // check if winner
    if(gamePlaying) {
        // add current score to Global score
        scores[activePlayer] += roundScore;

        // update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // check if current player won and change player name, else next player
        if(scores[activePlayer] >= winningScore) {
            if(activePlayer === 0) {
                playerWinner = player0 + ' wins!';
            } else {
                playerWinner = player1 + ' wins!';
            }
            document.querySelector('#name-change'+activePlayer).value = playerWinner;
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);
function nextPlayer() {
    // similar to IF statements - if 0, then switch to 1, else keep at 0
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    // reset
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // toggle active class
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // do not show dice after rolling 1
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

document.querySelector('.btn-score').addEventListener('click', function () {
    getWinningScore();
    var noneImp = document.querySelector('.form-winner');
    noneImp.className += " none-imp";
    var removeImp = document.querySelector('.form-winner');
    removeImp.classList.remove('grid-imp');
    // document.querySelector('.form-winner').style.display = 'none';
});

// define winning score from user
function getWinningScore() {
    winningScore = document.getElementById("winning-score").value;
    gamePlaying = true;
    return winningScore;
}

function init() {
    // reset all variables
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = false;
    previousDice = [];
    previousDice2 = [];

    // remove dice on load
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    // set all values to 0 on load
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // reset names
    if(player0) {
        document.querySelector('input[id="name-change0"]').value = player0;
    } else {
        player0 = document.getElementById('name-change0').placeholder;
        document.querySelector('input[id="name-change0"]').value = player0;
    }
    if(player1) {
        // document.getElementById('name-0').textContent = 'Pak paks';
        // document.getElementById('name-1').textContent = player1;
        document.querySelector('input[id="name-change1"]').value = player1;
    } else {
        player1 = document.getElementById('name-change1').placeholder;
        document.querySelector('input[id="name-change1"]').value = player1;
    }

    // remove winner class
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    // remove active class
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    // add active class to restart or begin a game
    document.querySelector('.player-0-panel').classList.add('active');

    // show the winning score for user to enter
    var removeImp = document.querySelector('.form-winner');
    removeImp.classList.remove('none-imp');
    var gridImp = document.querySelector('.form-winner');
    gridImp.className += " grid-imp";

    // document.querySelector('.form-winner').style.display = 'grid';
    document.getElementById("winning-score").textContent = 'Enter winning score';
}