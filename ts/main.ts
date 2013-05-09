module rps {
    "use strict";

    export class Game {

        private _rounds: Round[] = new Round[]();
        private _currentRound: Round;

        constructor(private _player1: IOpponent,
                    private _player2: IOpponent,
                    private _roundReadyCallback: (RoundOutcome) => void,
                    private _numberOfRounds: number = 5) {
            if (!this._player1 || !this._player2) {
                throw 'Both players needs to be set before starting the game';
            }
            if (!_numberOfRounds || _numberOfRounds <= 0) {
                throw 'The number of rounds should be a value bigger than 0';
            }

            var rules = new StandardRules();
            for (var i = 0; i < _numberOfRounds; i++) {
                var round = new Round(rules, this._roundReady);
                this._rounds.push(round);
            }
            this._currentRound = this._rounds[0];
        }

        public getPlayer1(): IOpponent {
            return this._player1;
        }

        public getPlayer2(): IOpponent {
            return this._player2;
        }

        private _roundReady() {
            this._roundReadyCallback(this._currentRound.getOutcome());
        }

    }

    export class Round {

        private _player1Move: MoveType;
        private _player2Move: MoveType;

        private _roundReady: bool = false;

        constructor(private _rules: IRules, private _onReadyCallback: () => void) {
            if (!_rules) {
                throw 'The rules of the game should be set';
            }
            if(!_onReadyCallback) {
                throw 'An onReadyCallback needs to be set';
            }
        }

        private _checkRoundReady() : void {
            if (this._player1Move && this._player2Move) {
                this._roundReady = true;
                this._onReadyCallback();
            }
        }

        public setPlayer1Move(move: MoveType) : void {
            if (this._player1Move) {
                throw 'Player 1 cannot change the move';
            }
            this._player1Move = move;
            this._checkRoundReady();
        }

        public setPlayer2Move(move: MoveType) : void {
            if (this._player2Move) {
                throw 'Player 2 cannot change the move';
            }
            this._player2Move = move;
            this._checkRoundReady();
        }

        public getOutcome() : RoundOutcome {
            if (!this._roundReady) {
                throw 'The round is not ready yet';
            }
            return this._rules.getOutcome(this._player1Move, this._player2Move);
        }

    }

    export interface IRules {

        getOutcome(player1Move: MoveType, player2Move: MoveType) : RoundOutcome;

    }

    export class StandardRules implements IRules {

        private _moveRules = new IMoveRule[];

        constructor() {
            this._moveRules.push(new RockMoveRule());
            this._moveRules.push(new PaperMoveRule());
            this._moveRules.push(new ScissorsMoveRule());
        }

        public getOutcome(player1Move: MoveType, player2Move: MoveType) : RoundOutcome {
            if (player1Move == player2Move) {
                return RoundOutcome.TIED;
            }
            var player1MoveRule = this._moveRules.filter(rule => rule.handles() == player1Move)[0];
            if (player1MoveRule.beats(player2Move)) {
                return RoundOutcome.PLAYER1WIN;
            }
            return RoundOutcome.PLAYER2WIN;
        }

    }

    export class RockMoveRule implements IMoveRule {

        public handles() : MoveType {
            return MoveType.ROCK;
        }

        public beats(moveType: MoveType) : bool {
            if (moveType == MoveType.SCISSORS) {
                return true;
            }
            return false;
        }

    }

    export class PaperMoveRule implements IMoveRule {

        public handles() : MoveType {
            return MoveType.PAPER;
        }

        public beats(moveType: MoveType) : bool {
            if (moveType == MoveType.ROCK) {
                return true;
            }
            return false;
        }

    }

    export class ScissorsMoveRule implements IMoveRule {

        public handles() : MoveType {
            return MoveType.SCISSORS;
        }

        public beats(moveType: MoveType) : bool {
            if (moveType == MoveType.PAPER) {
                return true;
            }
            return false;
        }

    }

    export interface IMoveRule {

        handles() : MoveType;

        beats(moveType: MoveType) : bool;

    }

    export enum RoundOutcome {
        TIED,
        PLAYER1WIN,
        PLAYER2WIN
    }

    export enum MoveType {
        ROCK,
        PAPER,
        SCISSORS
    }

    export enum OpponentType {
        CPU,
        HUMAN
    }

    export interface IOpponent {

        getName(): string;
        getOpponentType(): OpponentType;

    }

    export class Player implements IOpponent {

        constructor(private _name: string) {

        }

        public getName(): string {
            return this._name;
        }

        public getOpponentType(): OpponentType {
            return OpponentType.HUMAN;
        }

    }

    export class Cpu implements IOpponent {

        constructor() {

        }

        public getName(): string {
            return 'CPU';
        }

        public getOpponentType(): OpponentType {
            return OpponentType.CPU;
        }

    }

}