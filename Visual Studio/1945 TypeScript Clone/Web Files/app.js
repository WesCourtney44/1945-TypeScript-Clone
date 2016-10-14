class Game1945 {
    constructor(canvas) {
        this.canvas = canvas;
        this.onStart = () => { };
        this.onStop = () => { };
        this.step = (delta) => {
            this.frames++;
            this.seconds += this.clockSpeed.apply(delta);
        };
        this.draw = () => {
            let context = this.canvas.getContext("2d");
            context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            context.beginPath();
            context.arc(95, 50, 60, 0, 2 * Math.PI);
            context.stroke();
            context.fillText("Frames: " + this.frames, 48, 32);
            context.fillText("Seconds: " + Math.floor(this.seconds), 48, 48);
            context.fillText("FPS: " + Math.floor(this.frames / this.seconds), 48, 64);
        };
        this.frames = 0;
        this.seconds = 0;
        this.clockSpeed = new UnitsPerSecond(1);
    }
}
class Main {
    static main() {
        let canvas = document.getElementById("myCanvas");
        let game = new Game1945(canvas);
        let engine = new GameEngine(game);
        engine.start();
    }
}
class Delta {
    constructor(milliseconds) {
        this._milliseconds = milliseconds;
        this._seconds = milliseconds / 1000;
    }
    apply(unitsPerSecond) {
        return this.seconds * unitsPerSecond;
    }
    get milliseconds() {
        return this._milliseconds;
    }
    get seconds() {
        return this._seconds;
    }
}
class GameEngine {
    constructor(game) {
        this.game = game;
        this._isRunning = false;
        this.previousTime = 0;
        this.start = () => {
            this._isRunning = true;
            this.game.onStart();
            this.previousTime = Date.now();
            this.loop();
        };
        this.loop = () => {
            let currentTime = Date.now();
            let deltaValue = currentTime - this.previousTime;
            deltaValue = (deltaValue < 0) ? 0 : deltaValue;
            this.previousTime = Date.now();
            this.game.step(new Delta(deltaValue));
            this.game.draw();
            if (this.isRunning) {
                window.requestAnimationFrame(this.loop);
            }
        };
        this.stop = () => {
            this._isRunning = false;
        };
    }
    get isRunning() {
        return this._isRunning;
    }
}
class UnitsPerSecond {
    constructor(units, seconds = 1) {
        this._value = units / seconds;
    }
    get value() {
        return this._value;
    }
    apply(delta) {
        return delta.apply(this.value);
    }
}
