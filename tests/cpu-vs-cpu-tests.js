'use strict';

module('Gien a CPU vs CPU Game');
var getKnownCpuVsCpuGame = function () {
    var player1 = new rps.Cpu();
    var player2 = new rps.Cpu();
    var game = new rps.Game(player1, player2);
    return game;
};
test('When creating a new Game with two CPUs', function () {
    var game = getKnownCpuVsCpuGame();
    equals(game.getPlayer1().getOpponentType(), rps.OpponentType.CPU, 'Player 1 should be a CPU');
    equals(game.getPlayer2().getOpponentType(), rps.OpponentType.CPU, 'Player 2 should be a CPU');
});