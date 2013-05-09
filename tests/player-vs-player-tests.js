'use strict';

module('Given a Player vs Player Game');
var getKnownPlayerVsPlayerGame = function () {
    var player1 = new rps.Player('Player 1');
    var player2 = new rps.Player('Player 2');
    var game = new rps.Game(player1, player2);
    return game;
};
test('When creating a new Game with two Players', function () {
    var game = getKnownPlayerVsPlayerGame();
    equals(game.getPlayer1().getOpponentType(), rps.OpponentType.HUMAN, 'Player 1 should be a Human');
    equals(game.getPlayer2().getOpponentType(), rps.OpponentType.HUMAN, 'Player 2 should be a Human');
});