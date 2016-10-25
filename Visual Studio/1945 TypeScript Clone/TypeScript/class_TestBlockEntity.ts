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

namespace TestBlock {

    export class BlockEntity implements Entity {

        
        private static readonly WIDTH: number = 64;
        private static readonly HEIGHT: number = 64;
        private readonly context: StateContext;
        private readonly game: Game;

        constructor(x: number, y: number, game: Game) {
            this.context = new StateContext(x, y);
            this.game = game;
            game.eventBus.addAnyKeyPressListener((keyCode: KeyCode) => {
                let input: Input = "Unhandled";
                switch (keyCode) {
                    case KeyCode.LEFT_ARROW: input = "LeftPressed"; break;
                    case KeyCode.RIGHT_ARROW: input = "RightPressed"; break;
                    case KeyCode.UP_ARROW: input = "UpPressed"; break;
                    case KeyCode.DOWN_ARROW: input = "DownPressed"; break;
                }
                this.context.handle(input);
            });
            game.eventBus.addAnyKeyReleaseListener((keyCode: KeyCode) => {
                let input: Input = "Unhandled";
                switch (keyCode) {
                    case KeyCode.LEFT_ARROW: input = "LeftReleased"; break;
                    case KeyCode.RIGHT_ARROW: input = "RightReleased"; break;
                    case KeyCode.UP_ARROW: input = "UpReleased"; break;
                    case KeyCode.DOWN_ARROW: input = "DownReleased"; break;
                }
                this.context.handle(input);
            });
        }

        get x(): number {
            return this.context.x;
        }

        get y(): number {
            return this.context.y;
        }

        public step(delta: Delta) {
            this.context.step(delta);
        }
        public draw() {
            let drawer = this.game.context;
            let temp = drawer.fillStyle;
            drawer.fillStyle = "red";
            drawer.fillRect(this.x, this.y, BlockEntity.WIDTH, BlockEntity.HEIGHT);
            drawer.fillStyle = temp;
        }

    }

    type Input = "Unhandled" | "LeftPressed" | "LeftReleased" | "RightPressed" | "RightReleased" |
        "UpPressed" | "UpReleased" | "DownPressed" | "DownReleased";

    interface State {
        step(delta: Delta): void;
        handle(input: Input): void;
    }

    class StateContext {
        public readonly SPEED: UnitsPerSecond = new UnitsPerSecond(120);
        public x: number;
        public y: number;
        private _state: State;

        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
            this._state = new Still(this);
        }

        get state(): State {
            return this._state;
        }

        set state(value: State) {
            this._state = value;
        }

        public step(delta: Delta) {
            this._state.step(delta);
        }

        public handle(input: Input) {
            this._state.handle(input);
        }
    }

    class Still implements State {
        constructor(public readonly context: StateContext) { }
        public step(delta: Delta) {/* Do Nothing */ }
        public handle(input: Input) {
            switch (input) {
                case "LeftPressed": this.context.state = new MovingLeft(this.context); break;
                case "RightPressed": this.context.state = new MovingRight(this.context); break;
                case "UpPressed": this.context.state = new MovingUp(this.context); break;
                case "DownPressed": this.context.state = new MovingDown(this.context); break;
            }
        }
    }

    class MovingLeft implements State {
        constructor(public readonly context: StateContext) { }
        public step(delta: Delta) { this.context.x -= this.context.SPEED.apply(delta); }
        public handle(input: Input) {
            switch (input) {
                case "LeftReleased": this.context.state = new Still(this.context); break;
            }
        }
    }

    class MovingRight implements State {
        constructor(public readonly context: StateContext) { }
        public step(delta: Delta) { this.context.x += this.context.SPEED.apply(delta); }
        public handle(input: Input) {
            switch (input) {
                case "RightReleased": this.context.state = new Still(this.context); break;
            }
        }
    }

    class MovingUp implements State {
        constructor(public readonly context: StateContext) { }
        public step(delta: Delta) { this.context.y -= this.context.SPEED.apply(delta); }
        public handle(input: Input) {
            switch (input) {
                case "UpReleased": this.context.state = new Still(this.context); break;
            }
        }
    }

    class MovingDown implements State {
        constructor(public readonly context: StateContext) { }
        public step(delta: Delta) { this.context.y += this.context.SPEED.apply(delta); }
        public handle(input: Input) {
            switch (input) {
                case "DownReleased": this.context.state = new Still(this.context); break;
            }
        }
    }
}