var Game1945 = (function () {
    function Game1945(canvas) {
        this.eventBus = new EventBus();
        this.frames = 0;
        this.seconds = 0;
        this.clockSpeed = new UnitsPerSecond(1);
        this.canvas = canvas;
        this.blockEntity = new TestBlock.BlockEntity(64, 64, this);
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
//class TestBlockEntity implements Entity {
//    public X: number;
//    public Y: number;
//    private readonly width: number = 64;
//    private readonly height: number = 64;
//    private readonly game: Game;
//    private readonly speed: UnitsPerSecond = new UnitsPerSecond(120);
//    private horizontal: "left" | "stopped" | "right" = "stopped";
//    private vertical: "up" | "stopped" | "down" = "stopped";
//    constructor(x: number, y: number, game: Game) {
//        this.X = x;
//        this.Y = y;
//        this.game = game;
//        game.eventBus // method chaining
//            // UP ARROW
//            .addKeyPressListener(KeyCode.UP_ARROW, () => {
//                this.vertical = this.vertical === "stopped" ? "up" : this.vertical;
//            })
//            .addKeyReleaseListener(KeyCode.UP_ARROW, () => {
//                this.vertical = this.vertical === "up" ? "stopped" : this.vertical;
//            })
//            // DOWN ARROW
//            .addKeyPressListener(KeyCode.DOWN_ARROW, () => {
//                this.vertical = this.vertical === "stopped" ? "down" : this.vertical;
//            })
//            .addKeyReleaseListener(KeyCode.DOWN_ARROW, () => {
//                this.vertical = this.vertical === "down" ? "stopped" : this.vertical;
//            })
//            // RIGHT ARROW
//            .addKeyPressListener(KeyCode.RIGHT_ARROW, () => {
//                this.horizontal = this.horizontal === "stopped" ? "right" : this.horizontal;
//            })
//            .addKeyReleaseListener(KeyCode.RIGHT_ARROW, () => {
//                this.horizontal = this.horizontal === "right" ? "stopped" : this.horizontal;
//            })
//            // LEFt ARROW
//            .addKeyPressListener(KeyCode.LEFT_ARROW, () => {
//                this.horizontal = this.horizontal === "stopped" ? "left" : this.horizontal;
//            })
//            .addKeyReleaseListener(KeyCode.LEFT_ARROW, () => {
//                this.horizontal = this.horizontal === "left" ? "stopped" : this.horizontal;
//            });
//    }
//    public step(delta: Delta): void {
//        let calculatedSpeed: number = this.speed.apply(delta);
//        switch (this.horizontal) {
//            case "left": this.X += -calculatedSpeed; break;
//            case "right": this.X += calculatedSpeed; break;
//        }
//        switch (this.vertical) {
//            case "up": this.Y += -calculatedSpeed; break;
//            case "down": this.Y += calculatedSpeed; break;
//        }
//    }
//    public draw(): void {
//        let context = this.game.context;
//        let temp = context.fillStyle;
//        context.fillStyle = "red";
//        context.fillRect(this.X, this.Y, this.width, this.height);
//        context.fillStyle = temp;
//    }
//}
var TestBlock;
(function (TestBlock) {
    var BlockEntity = (function () {
        function BlockEntity(x, y, game) {
            var _this = this;
            this.context = new StateContext(x, y);
            this.game = game;
            game.eventBus.addAnyKeyPressListener(function (keyCode) {
                var input = "Unhandled";
                switch (keyCode) {
                    case KeyCode.LEFT_ARROW:
                        input = "LeftPressed";
                        break;
                    case KeyCode.RIGHT_ARROW:
                        input = "RightPressed";
                        break;
                    case KeyCode.UP_ARROW:
                        input = "UpPressed";
                        break;
                    case KeyCode.DOWN_ARROW:
                        input = "DownPressed";
                        break;
                }
                _this.context.handle(input);
            });
            game.eventBus.addAnyKeyReleaseListener(function (keyCode) {
                var input = "Unhandled";
                switch (keyCode) {
                    case KeyCode.LEFT_ARROW:
                        input = "LeftReleased";
                        break;
                    case KeyCode.RIGHT_ARROW:
                        input = "RightReleased";
                        break;
                    case KeyCode.UP_ARROW:
                        input = "UpReleased";
                        break;
                    case KeyCode.DOWN_ARROW:
                        input = "DownReleased";
                        break;
                }
                _this.context.handle(input);
            });
        }
        Object.defineProperty(BlockEntity.prototype, "x", {
            get: function () {
                return this.context.x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BlockEntity.prototype, "y", {
            get: function () {
                return this.context.y;
            },
            enumerable: true,
            configurable: true
        });
        BlockEntity.prototype.step = function (delta) {
            this.context.step(delta);
        };
        BlockEntity.prototype.draw = function () {
            var drawer = this.game.context;
            var temp = drawer.fillStyle;
            drawer.fillStyle = "red";
            drawer.fillRect(this.x, this.y, BlockEntity.WIDTH, BlockEntity.HEIGHT);
            drawer.fillStyle = temp;
        };
        BlockEntity.WIDTH = 64;
        BlockEntity.HEIGHT = 64;
        return BlockEntity;
    }());
    TestBlock.BlockEntity = BlockEntity;
    var StateContext = (function () {
        function StateContext(x, y) {
            this.SPEED = new UnitsPerSecond(120);
            this.x = x;
            this.y = y;
            this._state = new Still(this);
        }
        Object.defineProperty(StateContext.prototype, "state", {
            get: function () {
                return this._state;
            },
            set: function (value) {
                this._state = value;
            },
            enumerable: true,
            configurable: true
        });
        StateContext.prototype.step = function (delta) {
            this._state.step(delta);
        };
        StateContext.prototype.handle = function (input) {
            this._state.handle(input);
        };
        return StateContext;
    }());
    var Still = (function () {
        function Still(context) {
            this.context = context;
        }
        Still.prototype.step = function (delta) { };
        Still.prototype.handle = function (input) {
            switch (input) {
                case "LeftPressed":
                    this.context.state = new MovingLeft(this.context);
                    break;
                case "RightPressed":
                    this.context.state = new MovingRight(this.context);
                    break;
                case "UpPressed":
                    this.context.state = new MovingUp(this.context);
                    break;
                case "DownPressed":
                    this.context.state = new MovingDown(this.context);
                    break;
            }
        };
        return Still;
    }());
    var MovingLeft = (function () {
        function MovingLeft(context) {
            this.context = context;
        }
        MovingLeft.prototype.step = function (delta) { this.context.x -= this.context.SPEED.apply(delta); };
        MovingLeft.prototype.handle = function (input) {
            switch (input) {
                case "LeftReleased":
                    this.context.state = new Still(this.context);
                    break;
            }
        };
        return MovingLeft;
    }());
    var MovingRight = (function () {
        function MovingRight(context) {
            this.context = context;
        }
        MovingRight.prototype.step = function (delta) { this.context.x += this.context.SPEED.apply(delta); };
        MovingRight.prototype.handle = function (input) {
            switch (input) {
                case "RightReleased":
                    this.context.state = new Still(this.context);
                    break;
            }
        };
        return MovingRight;
    }());
    var MovingUp = (function () {
        function MovingUp(context) {
            this.context = context;
        }
        MovingUp.prototype.step = function (delta) { this.context.y -= this.context.SPEED.apply(delta); };
        MovingUp.prototype.handle = function (input) {
            switch (input) {
                case "UpReleased":
                    this.context.state = new Still(this.context);
                    break;
            }
        };
        return MovingUp;
    }());
    var MovingDown = (function () {
        function MovingDown(context) {
            this.context = context;
        }
        MovingDown.prototype.step = function (delta) { this.context.y += this.context.SPEED.apply(delta); };
        MovingDown.prototype.handle = function (input) {
            switch (input) {
                case "DownReleased":
                    this.context.state = new Still(this.context);
                    break;
            }
        };
        return MovingDown;
    }());
})(TestBlock || (TestBlock = {}));
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
        this.keyCodePressMap = [];
        this.keyCodeReleaseMap = [];
        this.anyPressList = [];
        this.anyReleaseList = [];
        this.key = new KeyStateHandler();
        // give KEY PRESS listener to document
        document.addEventListener("keydown", function (event) {
            var keyCode = event.keyCode;
            if (_this.key.isUp(keyCode)) {
                _this.key.press(keyCode);
                EventBus.runAllListenersIn(keyCode, _this.anyPressList);
                EventBus.runAllActionsIn(_this.keyCodePressMap[keyCode]);
            }
        });
        // give KEY RELEASE listener to document
        document.addEventListener("keyup", function (event) {
            var keyCode = event.keyCode;
            if (!_this.key.isUp(keyCode)) {
                _this.key.release(keyCode);
                EventBus.runAllListenersIn(keyCode, _this.anyReleaseList);
                EventBus.runAllActionsIn(_this.keyCodeReleaseMap[keyCode]);
            }
        });
    }
    EventBus.runAllListenersIn = function (keyCode, list) {
        if (list) {
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var listener = list_1[_i];
                listener(keyCode);
            }
        }
    };
    EventBus.runAllActionsIn = function (list) {
        if (list) {
            for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
                var action = list_2[_i];
                action();
            }
        }
    };
    EventBus.prototype.addKeyCodePressListener = function (keyCode, action) {
        EventBus.addEventAction(this.keyCodePressMap, keyCode, action);
        return this;
    };
    EventBus.prototype.addKeyCodeReleaseListener = function (keyCode, action) {
        EventBus.addEventAction(this.keyCodeReleaseMap, keyCode, action);
        return this;
    };
    EventBus.prototype.addAnyKeyPressListener = function (listener) {
        this.anyPressList.push(listener);
    };
    EventBus.prototype.addAnyKeyReleaseListener = function (listener) {
        this.anyReleaseList.push(listener);
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
