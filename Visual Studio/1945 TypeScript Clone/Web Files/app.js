var Game1945 = (function () {
    function Game1945(canvas) {
        this.canvas = canvas;
        this.frames = 0;
        this.seconds = 0;
        this.clockSpeed = new UnitsPerSecond(1);
        this.myCanvas = canvas;
        this.context = this.canvas.getContext("2d");
    }
    Game1945.prototype.onStart = function () { };
    Game1945.prototype.onStop = function () { };
    Game1945.prototype.step = function (delta) {
        this.frames++;
        this.seconds += this.clockSpeed.apply(delta);
    };
    Game1945.prototype.draw = function () {
        this.context.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height);
        this.context.beginPath();
        this.context.arc(95, 50, 60, 0, 2 * Math.PI);
        this.context.stroke();
        this.context.fillText("Frames: " + this.frames, 48, 32);
        this.context.fillText("Seconds: " + Math.floor(this.seconds), 48, 48);
        this.context.fillText("FPS: " + Math.floor(this.frames / this.seconds), 48, 64);
    };
    return Game1945;
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
