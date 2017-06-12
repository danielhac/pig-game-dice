/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer;

scores = [0,0];
roundScore = 0;
activePlayer = 0;

// remove dice on load
document.querySelector('.dice').style.display = 'none';

// set all values to 0 on load
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

// when clicking on the roll dice button
document.querySelector('.btn-roll').addEventListener('click', function () {
    // randomized number for dice (1-6)
    var dice = Math.floor(Math.random() * 6) + 1;

    // display dice
    var diceDOM =document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    // update round score IF dice is NOT a 1
    if(dice !== 1) {
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
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
    }

});






// var x = document.querySelector('#score-0').textContent;
