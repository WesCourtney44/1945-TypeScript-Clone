var Delta = (function () {
    function Delta(milliseconds) {
        this._milliseconds = milliseconds;
        this._seconds = milliseconds / 1000;
    }
    Delta.prototype.apply = function (unitsPerSecond) {
        return this.seconds * unitsPerSecond;
    };
    Object.defineProperty(Delta.prototype, "milliseconds", {
        get: function () {
            return this._milliseconds;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Delta.prototype, "seconds", {
        get: function () {
            return this._seconds;
        },
        enumerable: true,
        configurable: true
    });
    return Delta;
}());
var Game1945 = (function () {
    function Game1945(canvas) {
        var _this = this;
        this.canvas = canvas;
        this.frames = 0;
        this.seconds = 0;
        this.clockSpeed = new UnitsPerSecond(1);
        this.eventBus = new EventBus();
        this.coords = { x: 64, y: 64 };
        this.eventBus.doOnKeyDown(Key.UP, function () {
            _this.coords.y -= 4;
        });
        this.eventBus.doOnKeyDown(Key.DOWN, function () {
            _this.coords.y += 4;
        });
    }
    Game1945.prototype.onStart = function () { };
    Game1945.prototype.onStop = function () { };
    Game1945.prototype.step = function (delta) {
        this.frames++;
        this.seconds += this.clockSpeed.apply(delta);
    };
    Game1945.prototype.draw = function () {
        var context = this.canvas.getContext("2d");
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        context.beginPath();
        context.arc(95, 50, 60, 0, 2 * Math.PI);
        context.stroke();
        var x = this.coords.x;
        var y = this.coords.y;
        context.fillRect(x, y, 64, 64);
        context.fillText("Frames: " + this.frames, 48, 32);
        context.fillText("Seconds: " + Math.floor(this.seconds), 48, 48);
        context.fillText("FPS: " + Math.floor(this.frames / this.seconds), 48, 64);
    };
    return Game1945;
}());
var EventBus = (function () {
    function EventBus() {
        var _this = this;
        // this is not a method, this is a closure should that never be called directly!
        this.handleKeyDown = function (event) {
            var list = _this.keyDownMap[event.keyCode];
            if (list !== undefined) {
                for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                    var action = list_1[_i];
                    action();
                }
            }
        };
        this.keyDownMap = [];
        document.addEventListener("keydown", this.handleKeyDown);
    }
    EventBus.prototype.doOnKeyDown = function (key, action) {
        var map = this.keyDownMap;
        if (map[key] === undefined) {
            map[key] = [];
        }
        map[key].push(action);
    };
    return EventBus;
}());
var Key;
(function (Key) {
    Key[Key["LEFT"] = 37] = "LEFT";
    Key[Key["UP"] = 38] = "UP";
    Key[Key["RIGHT"] = 39] = "RIGHT";
    Key[Key["DOWN"] = 40] = "DOWN";
})(Key || (Key = {}));
var GameEngine = (function () {
    function GameEngine(argGame) {
        this.argGame = argGame;
        this._isRunning = false;
        this.game = argGame;
        this.previousTime = 0;
    }
    Object.defineProperty(GameEngine.prototype, "isRunning", {
        get: function () {
            return this._isRunning;
        },
        enumerable: true,
        configurable: true
    });
    GameEngine.prototype.start = function () {
        this._isRunning = true;
        this.game.onStart();
        this.previousTime = Date.now();
        this.loop();
    };
    GameEngine.prototype.loop = function () {
        var _this = this;
        var currentTime = Date.now();
        var deltaValue = currentTime - this.previousTime;
        deltaValue = (deltaValue < 0) ? 0 : deltaValue;
        this.previousTime = Date.now();
        this.game.step(new Delta(deltaValue));
        this.game.draw();
        if (this.isRunning) {
            // wrapping the call to this.loop() in a closure
            // to protect it from using the wrong "this".
            window.requestAnimationFrame(function () { _this.loop(); });
        }
    };
    GameEngine.prototype.stop = function () {
        this._isRunning = false;
    };
    return GameEngine;
}());
var Main = (function () {
    function Main() {
    }
    Main.main = function () {
        var canvas = document.getElementById("myCanvas");
        var game = new Game1945(canvas);
        var engine = new GameEngine(game);
        engine.start();
    };
    return Main;
}());
var UnitsPerSecond = (function () {
    function UnitsPerSecond(units, seconds) {
        if (seconds === void 0) { seconds = 1; }
        this._value = units / seconds;
    }
    Object.defineProperty(UnitsPerSecond.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    UnitsPerSecond.prototype.apply = function (delta) {
        return delta.apply(this.value);
    };
    return UnitsPerSecond;
}());
