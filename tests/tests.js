"use strict";

module("Given a Game");
test("When creating a new Game", function() {
    var game = new rps.Game();
    game.player1 = new rps.Player("Player 1");
    game.player2 = new rps.Cpu();
    equals(game.player1.getOpponentType(), rps.OpponentType.HUMAN, "A human player should be set");
    equals(game.player2.getOpponentType(), rps.OpponentType.CPU, "A cpu player should be set");
});

module("Given a Player");
test("When creating a new Player", function() {
    var knownPlayerName = "Player 1";
    var player = new rps.Player(knownPlayerName);
    equals(player.getName(), knownPlayerName, "The name should be " + knownPlayerName);
    equals(player.getOpponentType(), rps.OpponentType.HUMAN, "The opponent type should be Human");
});
test("When creating a new Cpu", function() {
   var cpu = new rps.Cpu();
    equals(cpu.getName(), "CPU", "The name should be CPU");
    equals(cpu.getOpponentType(), rps.OpponentType.CPU, "The opponent type should be Cpu");
});