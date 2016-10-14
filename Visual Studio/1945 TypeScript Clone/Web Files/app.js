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
class Main {
    static main() {
        let c = document.getElementById("myCanvas");
        let ctx = c.getContext("2d");
        ctx.beginPath();
        ctx.arc(95, 50, 60, 0, 2 * Math.PI);
        ctx.stroke();
        //Uncomment the code below to test GameEngine
        //count is incremented on every update
        //seconds uses the delta to increment by 1 every second.
        let count = 0;
        let seconds = 0;
        (new GameEngine({
            onStart: () => { },
            step: (delta) => {
                count++;
                seconds += delta.apply(1);
                //console.log("delta: " + delta.seconds);
            },
            draw: () => {
                ctx.clearRect(0, 0, c.width, c.height);
                ctx.fillText("Count: " + count, 32, 32);
                ctx.fillText("Seconds: " + Math.floor(seconds), 32, 64);
            },
            onStop: () => { }
        })).start();
    }
}
