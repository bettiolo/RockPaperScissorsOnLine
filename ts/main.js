var rps;
(function (rps) {
    "use strict";
    var Game = (function () {
        function Game() {
        }
        return Game;
    })();
    rps.Game = Game;    
    (function (OpponentType) {
        OpponentType._map = [];
        OpponentType._map[0] = "CPU";
        OpponentType.CPU = 0;
        OpponentType._map[1] = "HUMAN";
        OpponentType.HUMAN = 1;
    })(rps.OpponentType || (rps.OpponentType = {}));
    var OpponentType = rps.OpponentType;
    var Player = (function () {
        function Player(name) {
            this.name = name;
        }
        Player.prototype.getName = function () {
            return this.name;
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
