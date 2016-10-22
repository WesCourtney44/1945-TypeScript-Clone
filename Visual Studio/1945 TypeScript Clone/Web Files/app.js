var Game1945 = (function () {
    function Game1945(canvas) {
        this.eventBus = new EventBus();
        this.frames = 0;
        this.seconds = 0;
        this.clockSpeed = new UnitsPerSecond(1);
        this.canvas = canvas;
        this.blockEntity = new TestBlockEntity(64, 64, this);
    }
    Object.defineProperty(Game1945.prototype, "context", {
        get: function () {
            return this.canvas.getContext("2d");
        },
        enumerable: true,
        configurable: true
    });
    Game1945.prototype.onStart = function () { };
    Game1945.prototype.onStop = function () { };
    Game1945.prototype.step = function (delta) {
        this.blockEntity.step(delta);
        this.frames++;
        this.seconds += this.clockSpeed.apply(delta);
    };
    Game1945.prototype.draw = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.blockEntity.draw();
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
var TestBlockEntity = (function () {
    function TestBlockEntity(x, y, game) {
        var _this = this;
        this.width = 64;
        this.height = 64;
        this.speed = new UnitsPerSecond(64);
        this.horizontal = "stopped";
        this.vertical = "stopped";
        this.x = x;
        this.y = y;
        this.game = game;
        game.eventBus // method chaining
            .eventKeyPress(KeyCode.UP_ARROW, function () {
            _this.vertical = _this.vertical === "stopped" ? "up" : _this.vertical;
        })
            .eventKeyRelease(KeyCode.UP_ARROW, function () {
            _this.vertical = _this.vertical === "up" ? "stopped" : _this.vertical;
        })
            .eventKeyPress(KeyCode.DOWN_ARROW, function () {
            _this.vertical = _this.vertical === "stopped" ? "down" : _this.vertical;
        })
            .eventKeyRelease(KeyCode.DOWN_ARROW, function () {
            _this.vertical = _this.vertical === "down" ? "stopped" : _this.vertical;
        })
            .eventKeyPress(KeyCode.RIGHT_ARROW, function () {
            _this.horizontal = _this.horizontal === "stopped" ? "right" : _this.horizontal;
        })
            .eventKeyRelease(KeyCode.RIGHT_ARROW, function () {
            _this.horizontal = _this.horizontal === "right" ? "stopped" : _this.horizontal;
        })
            .eventKeyPress(KeyCode.LEFT_ARROW, function () {
            _this.horizontal = _this.horizontal === "stopped" ? "left" : _this.horizontal;
        })
            .eventKeyRelease(KeyCode.LEFT_ARROW, function () {
            _this.horizontal = _this.horizontal === "left" ? "stopped" : _this.horizontal;
        });
    }
    TestBlockEntity.prototype.step = function (delta) {
        var calculatedSpeed = this.speed.apply(delta);
        switch (this.horizontal) {
            case "left":
                this.x += -calculatedSpeed;
                break;
            case "right":
                this.x += calculatedSpeed;
                break;
        }
        switch (this.vertical) {
            case "up":
                this.y += -calculatedSpeed;
                break;
            case "down":
                this.y += calculatedSpeed;
                break;
        }
    };
    TestBlockEntity.prototype.draw = function () {
        var context = this.game.context;
        var temp = context.fillStyle;
        context.fillStyle = "red";
        context.fillRect(this.x, this.y, this.width, this.height);
        context.fillStyle = temp;
    };
    return TestBlockEntity;
}());
var Delta = (function () {
    function Delta(milliseconds) {
        this.milliseconds = milliseconds;
        this.seconds = milliseconds / 1000;
    }
    Delta.prototype.apply = function (unitsPerSecond) {
        return this.seconds * unitsPerSecond;
    };
    return Delta;
}());
var EventBus = (function () {
    function EventBus() {
        var _this = this;
        this.keyPressMap = [];
        this.keyReleaseMap = [];
        this.key = new KeyStateHandler();
        // give KEY PRESS listener to document
        document.addEventListener("keydown", function (event) {
            var keyCode = event.keyCode;
            if (_this.key.isUp(keyCode)) {
                _this.key.press(keyCode);
                _this.handleActionList(_this.keyPressMap[keyCode]);
            }
        });
        // give KEY RELEASE listener to document
        document.addEventListener("keyup", function (event) {
            var keyCode = event.keyCode;
            if (!_this.key.isUp(keyCode)) {
                _this.key.release(keyCode);
                _this.handleActionList(_this.keyReleaseMap[keyCode]);
            }
        });
    }
    EventBus.prototype.handleActionList = function (list) {
        if (list) {
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var action = list_1[_i];
                action();
            }
        }
    };
    EventBus.prototype.eventKeyPress = function (keyCode, action) {
        EventBus.addEventAction(this.keyPressMap, keyCode, action);
        return this;
    };
    EventBus.prototype.eventKeyRelease = function (keyCode, action) {
        EventBus.addEventAction(this.keyReleaseMap, keyCode, action);
        return this;
    };
    EventBus.addEventAction = function (map, keyCode, action) {
        if (!map[keyCode]) {
            map[keyCode] = [];
        }
        map[keyCode].push(action);
    };
    return EventBus;
}());
var GameEngine = (function () {
    function GameEngine(game) {
        this._isRunning = false;
        this.previousTime = 0;
        this.game = game;
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
var KeyStateHandler = (function () {
    function KeyStateHandler() {
        this._keyState = [];
    }
    KeyStateHandler.prototype.getState = function (key) {
        if (!this._keyState[key]) {
            this._keyState[key] = "up";
        }
        return this._keyState[key];
    };
    KeyStateHandler.prototype.isUp = function (key) {
        return this.getState(key) === "up";
    };
    KeyStateHandler.prototype.press = function (key) {
        this._keyState[key] = "down";
    };
    KeyStateHandler.prototype.release = function (key) {
        this._keyState[key] = "up";
    };
    return KeyStateHandler;
}());
var UnitsPerSecond = (function () {
    function UnitsPerSecond(units, seconds) {
        if (seconds === void 0) { seconds = 1; }
        this.value = units / seconds;
    }
    UnitsPerSecond.prototype.apply = function (delta) {
        return delta.apply(this.value);
    };
    return UnitsPerSecond;
}());
var KeyCode;
(function (KeyCode) {
    KeyCode[KeyCode["LEFT_ARROW"] = 37] = "LEFT_ARROW";
    KeyCode[KeyCode["UP_ARROW"] = 38] = "UP_ARROW";
    KeyCode[KeyCode["RIGHT_ARROW"] = 39] = "RIGHT_ARROW";
    KeyCode[KeyCode["DOWN_ARROW"] = 40] = "DOWN_ARROW";
})(KeyCode || (KeyCode = {}));
