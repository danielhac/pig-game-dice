/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

// when clicking on the roll dice button
document.querySelector('.btn-roll').addEventListener('click', function () {
    // check if winner
    if(gamePlaying) {
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
            nextPlayer();
        }
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
        if(scores[activePlayer] >= 50) {
            document.querySelector('#name-'+activePlayer).textContent = 'Pakchubs forever!';
            document.querySelector('.dice').style.display = 'none';
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
}

function init() {
    // reset all variables
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    // remove dice on load
    document.querySelector('.dice').style.display = 'none';

    // set all values to 0 on load
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // reset names
    document.getElementById('name-0').textContent = 'Pak paks';
    document.getElementById('name-1').textContent = 'Bae Bae';

    // remove winner class
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    // remove active class
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    // add active class to restart or begin a game
    document.querySelector('.player-0-panel').classList.add('active');
}



// var x = document.querySelector('#score-0').textContent;
