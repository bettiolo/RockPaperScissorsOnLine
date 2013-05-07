module rps {
    "use strict";

    export class Game {

        public Player1: Opponent;
        public Player2: Opponent;

        constructor() {

        }

    }

    export enum OpponentType {
        CPU,
        HUMAN
    }

    export interface Opponent {

        getName(): string;
        getOpponentType(): OpponentType;

    }

    export class Player implements Opponent {

        public getName(): string { return this.name; }
        public getOpponentType(): OpponentType { return OpponentType.HUMAN; }

        constructor(private name: string) {
        }

    }

    export class Cpu implements Opponent {

        public getName(): string { return 'CPU'; }
        public getOpponentType(): OpponentType { return OpponentType.CPU; }

        constructor() {

        }

    }

}