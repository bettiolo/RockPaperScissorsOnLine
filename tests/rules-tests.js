'use strict';

module('Given a MoveRule');
test('When playing the RockMoveRule', function () {
    var rockMoveRule = new rps.RockMoveRule();
    equals(rockMoveRule.handles(), rps.MoveType.ROCK, 'Should handle Rock moves');
    equals(rockMoveRule.beats(rps.MoveType.ROCK), false, 'Should not beat Rock');
    equals(rockMoveRule.beats(rps.MoveType.PAPER), false, 'Should not beat Paper');
    equals(rockMoveRule.beats(rps.MoveType.SCISSORS), true, 'Should beat Scissors');
});

test('When playing the PaperMoveRule', function () {
    var paperMoveRule = new rps.PaperMoveRule();
    equals(paperMoveRule.handles(), rps.MoveType.PAPER, 'Should handle Paper moves');
    equals(paperMoveRule.beats(rps.MoveType.ROCK), true, 'Should beat Rock');
    equals(paperMoveRule.beats(rps.MoveType.PAPER), false, 'Should not beat Paper');
    equals(paperMoveRule.beats(rps.MoveType.SCISSORS), false, 'Should not beat Scissors');
});

test('When playing the ScissorsMoveRule', function () {
    var scissorsMoveRule = new rps.ScissorsMoveRule();
    equals(scissorsMoveRule.handles(), rps.MoveType.SCISSORS, 'Should handle Scissors moves');
    equals(scissorsMoveRule.beats(rps.MoveType.ROCK), false, 'Should not beat Rock');
    equals(scissorsMoveRule.beats(rps.MoveType.PAPER), true, 'Should beat Paper');
    equals(scissorsMoveRule.beats(rps.MoveType.SCISSORS), false, 'Should not beat Scissors');
});

module('Given StandardRules');
test('When Player 1 plays Rock', function () {
    var standardRules = new rps.StandardRules();
    equals(standardRules.getOutcome(rps.MoveType.ROCK, rps.MoveType.ROCK), rps.RoundOutcome.TIED, 'Should be Tied if Player 2 plays Rock');
    equals(standardRules.getOutcome(rps.MoveType.ROCK, rps.MoveType.PAPER), rps.RoundOutcome.PLAYER2WIN, 'Should Lose if Player 2 plays Paper');
    equals(standardRules.getOutcome(rps.MoveType.ROCK, rps.MoveType.SCISSORS), rps.RoundOutcome.PLAYER1WIN, 'Should Win if Player 2 plays Scissors');
});
test('When Player 1 plays Paper', function () {
    var standardRules = new rps.StandardRules();
    equals(standardRules.getOutcome(rps.MoveType.PAPER, rps.MoveType.ROCK), rps.RoundOutcome.PLAYER1WIN, 'Should Win if Player 2 plays Rock');
    equals(standardRules.getOutcome(rps.MoveType.PAPER, rps.MoveType.PAPER), rps.RoundOutcome.TIED, 'Should be Tied if Player 2 plays Paper');
    equals(standardRules.getOutcome(rps.MoveType.PAPER, rps.MoveType.SCISSORS), rps.RoundOutcome.PLAYER2WIN, 'Should Lose Player 2 plays Scissors');
});
test('When Player 1 plays Scissors', function () {
    var standardRules = new rps.StandardRules();
    equals(standardRules.getOutcome(rps.MoveType.SCISSORS, rps.MoveType.ROCK), rps.RoundOutcome.PLAYER2WIN, 'Should Lose if Player 2 plays Rock');
    equals(standardRules.getOutcome(rps.MoveType.SCISSORS, rps.MoveType.PAPER), rps.RoundOutcome.PLAYER1WIN, 'Should Win if Player 2 plays Paper');
    equals(standardRules.getOutcome(rps.MoveType.SCISSORS, rps.MoveType.SCISSORS), rps.RoundOutcome.TIED, 'Should be Tied Player 2 plays Scissors');
});