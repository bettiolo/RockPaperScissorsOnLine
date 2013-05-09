'use strict';

module('Given a Round');
test('When playing a round', function () {
    var readyFired = false;
    var onRoundReady = function () {
        readyFired = true;
    };
    var round = new rps.Round(new rps.StandardRules(), onRoundReady);
    round.setPlayer1Move(rps.MoveType.PAPER);
    equals(readyFired, false, 'RoundReady should not be fired when only one player made his move');
    // throws(function ()  { round.setPlayer1Move(rps.MoveType.ROCK); }, 'Player 1 cannot change the move');
    round.setPlayer2Move(rps.MoveType.SCISSORS);
    equals(readyFired, true, 'When both players made their moves, the round should be ready');
    // throws(function ()  { round.setPlayer2Move(rps.MoveType.ROCK); }, 'Player 2 cannot change the move');
});

// ToDo: Test that an error is thrown if no onRoundReady callback is passed in the constructor

// ToDo: Test the various outcome possibilities and hide the MoveRules objects