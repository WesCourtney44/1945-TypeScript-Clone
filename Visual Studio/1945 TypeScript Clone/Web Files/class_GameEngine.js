class GameEngine {
    constructor(game) {
        this.game = game;
        this._isRunning = false;
        this.previousTime = 0;
        this.start = () => {
            this._isRunning = true;
            this.game.onStart();
            this.previousTime = Util.nowInSeconds();
            let self = this;
            let loop = () => {
                let currentTime = Util.nowInSeconds();
                let deltaValue = currentTime - self.previousTime;
                self.previousTime = Util.nowInSeconds();
                self.game.step(new Delta(deltaValue));
                self.game.draw();
                window.requestAnimationFrame(loop);
            };
            loop();
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
    constructor(seconds) {
        this.seconds = seconds;
    }
    apply(unitsPerSecond) {
        return this.seconds * unitsPerSecond;
    }
}
