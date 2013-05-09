'use strict';

module('Given a Player vs CPU Game');
var getKnownPlayerVsCpuGame = function () {
    var player1 = new rps.Player('Player 1');
    var player2 = new rps.Cpu();
    var game = new rps.Game(player1, player2);
    return game;
};
test('When creating a new Game with a Player and a CPU', function () {
    var game = getKnownPlayerVsCpuGame();
    equals(game.getPlayer1().getOpponentType(), rps.OpponentType.HUMAN, 'Player 1 should be a Human');
    equals(game.getPlayer2().getOpponentType(), rps.OpponentType.CPU, 'Player 2 should be a CPU');
});
