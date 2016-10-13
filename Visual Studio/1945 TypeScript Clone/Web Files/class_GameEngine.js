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
