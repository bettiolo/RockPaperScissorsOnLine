'use strict';

module('Given an Opponent');
test('When creating a new Player', function () {
    var knownPlayerName = 'Player 1';
    var player = new rps.Player(knownPlayerName);
    equals(player.getName(), knownPlayerName, 'The name should be ' + knownPlayerName);
    equals(player.getOpponentType(), rps.OpponentType.HUMAN, 'The opponent type should be Human');
});
test('When creating a new Cpu', function () {
    var cpu = new rps.Cpu();
    equals(cpu.getName(), 'CPU', 'The name should be CPU');
    equals(cpu.getOpponentType(), rps.OpponentType.CPU, 'The opponent type should be Cpu');
});