var rps;
(function (rps) {
    "use strict";
    var Game = (function () {
        function Game(_player1, _player2, _roundReadyCallback, _numberOfRounds) {
            if (typeof _numberOfRounds === "undefined") { _numberOfRounds = 5; }
            this._player1 = _player1;
            this._player2 = _player2;
            this._roundReadyCallback = _roundReadyCallback;
            this._numberOfRounds = _numberOfRounds;
            this._rounds = new Array();
            if(!this._player1 || !this._player2) {
                throw 'Both players needs to be set before starting the game';
            }
            if(!_numberOfRounds || _numberOfRounds <= 0) {
                throw 'The number of rounds should be a value bigger than 0';
            }
            var rules = new StandardRules();
            for(var i = 0; i < _numberOfRounds; i++) {
                var round = new Round(rules, this._roundReady);
                this._rounds.push(round);
            }
            this._currentRound = this._rounds[0];
        }
        Game.prototype.getPlayer1 = function () {
            return this._player1;
        };
        Game.prototype.getPlayer2 = function () {
            return this._player2;
        };
        Game.prototype._roundReady = function () {
            this._roundReadyCallback(this._currentRound.getOutcome());
        };
        return Game;
    })();
    rps.Game = Game;    
    var Round = (function () {
        function Round(_rules, _onReadyCallback) {
            this._rules = _rules;
            this._onReadyCallback = _onReadyCallback;
            this._roundReady = false;
            if(!_rules) {
                throw 'The rules of the game should be set';
            }
            if(!_onReadyCallback) {
                throw 'An onReadyCallback needs to be set';
            }
        }
        Round.prototype._checkRoundReady = function () {
            if(this._player1Move && this._player2Move) {
                this._roundReady = true;
                this._onReadyCallback();
            }
        };
        Round.prototype.setPlayer1Move = function (move) {
            if(this._player1Move) {
                throw 'Player 1 cannot change the move';
            }
            this._player1Move = move;
            this._checkRoundReady();
        };
        Round.prototype.setPlayer2Move = function (move) {
            if(this._player2Move) {
                throw 'Player 2 cannot change the move';
            }
            this._player2Move = move;
            this._checkRoundReady();
        };
        Round.prototype.getOutcome = function () {
            if(!this._roundReady) {
                throw 'The round is not ready yet';
            }
            return this._rules.getOutcome(this._player1Move, this._player2Move);
        };
        return Round;
    })();
    rps.Round = Round;    
    var StandardRules = (function () {
        function StandardRules() {
            this._moveRules = new Array();
            this._moveRules.push(new RockMoveRule());
            this._moveRules.push(new PaperMoveRule());
            this._moveRules.push(new ScissorsMoveRule());
        }
        StandardRules.prototype.getOutcome = function (player1Move, player2Move) {
            if(player1Move == player2Move) {
                return RoundOutcome.TIED;
            }
            var player1MoveRule = this._moveRules.filter(function (rule) {
                return rule.handles() == player1Move;
            })[0];
            if(player1MoveRule.beats(player2Move)) {
                return RoundOutcome.PLAYER1WIN;
            }
            return RoundOutcome.PLAYER2WIN;
        };
        return StandardRules;
    })();
    rps.StandardRules = StandardRules;    
    var RockMoveRule = (function () {
        function RockMoveRule() { }
        RockMoveRule.prototype.handles = function () {
            return MoveType.ROCK;
        };
        RockMoveRule.prototype.beats = function (moveType) {
            if(moveType == MoveType.SCISSORS) {
                return true;
            }
            return false;
        };
        return RockMoveRule;
    })();
    rps.RockMoveRule = RockMoveRule;    
    var PaperMoveRule = (function () {
        function PaperMoveRule() { }
        PaperMoveRule.prototype.handles = function () {
            return MoveType.PAPER;
        };
        PaperMoveRule.prototype.beats = function (moveType) {
            if(moveType == MoveType.ROCK) {
                return true;
            }
            return false;
        };
        return PaperMoveRule;
    })();
    rps.PaperMoveRule = PaperMoveRule;    
    var ScissorsMoveRule = (function () {
        function ScissorsMoveRule() { }
        ScissorsMoveRule.prototype.handles = function () {
            return MoveType.SCISSORS;
        };
        ScissorsMoveRule.prototype.beats = function (moveType) {
            if(moveType == MoveType.PAPER) {
                return true;
            }
            return false;
        };
        return ScissorsMoveRule;
    })();
    rps.ScissorsMoveRule = ScissorsMoveRule;    
    (function (RoundOutcome) {
        RoundOutcome._map = [];
        RoundOutcome._map[0] = "TIED";
        RoundOutcome.TIED = 0;
        RoundOutcome._map[1] = "PLAYER1WIN";
        RoundOutcome.PLAYER1WIN = 1;
        RoundOutcome._map[2] = "PLAYER2WIN";
        RoundOutcome.PLAYER2WIN = 2;
    })(rps.RoundOutcome || (rps.RoundOutcome = {}));
    var RoundOutcome = rps.RoundOutcome;
    (function (MoveType) {
        MoveType._map = [];
        MoveType._map[0] = "ROCK";
        MoveType.ROCK = 0;
        MoveType._map[1] = "PAPER";
        MoveType.PAPER = 1;
        MoveType._map[2] = "SCISSORS";
        MoveType.SCISSORS = 2;
    })(rps.MoveType || (rps.MoveType = {}));
    var MoveType = rps.MoveType;
    (function (OpponentType) {
        OpponentType._map = [];
        OpponentType._map[0] = "CPU";
        OpponentType.CPU = 0;
        OpponentType._map[1] = "HUMAN";
        OpponentType.HUMAN = 1;
    })(rps.OpponentType || (rps.OpponentType = {}));
    var OpponentType = rps.OpponentType;
    var Player = (function () {
        function Player(_name) {
            this._name = _name;
        }
        Player.prototype.getName = function () {
            return this._name;
        };
        Player.prototype.getOpponentType = function () {
            return OpponentType.HUMAN;
        };
        return Player;
    })();
    rps.Player = Player;    
    var Cpu = (function () {
        function Cpu() {
        }
        Cpu.prototype.getName = function () {
            return 'CPU';
        };
        Cpu.prototype.getOpponentType = function () {
            return OpponentType.CPU;
        };
        return Cpu;
    })();
    rps.Cpu = Cpu;    
})(rps || (rps = {}));
//@ sourceMappingURL=main.js.map
