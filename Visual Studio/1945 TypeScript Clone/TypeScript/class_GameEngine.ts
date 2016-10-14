class GameEngine {

    private _isRunning: boolean = false;
    private previousTime: number = 0;

    constructor(private game: IGame) { }

    public get isRunning(): boolean {
        return this._isRunning;
    }

    public start = () => {
        this._isRunning = true;
        this.game.onStart();
        this.previousTime = Date.now();
        this.loop();
    }

    private loop = () => {
        let currentTime = Date.now();
        let deltaValue = currentTime - this.previousTime;
        deltaValue = (deltaValue < 0) ? 0 : deltaValue;
        this.previousTime = Date.now();
        this.game.step(new Delta(deltaValue));
        this.game.draw();
        if (this.isRunning) {
            window.requestAnimationFrame(this.loop);
        }
    }

    public stop = () => {
        this._isRunning = false;
    }
}

interface IGame {
    onStart(): void;
    step(delta: Delta): void;
    draw(): void;
    onStop(): void;
}

class Delta {

    private _milliseconds: number;
    private _seconds: number;

    constructor(milliseconds: number) {
        this._milliseconds = milliseconds;
        this._seconds = milliseconds / 1000;
    }

    public apply(unitsPerSecond: number): number {
        return this.seconds * unitsPerSecond;
    }

    public get milliseconds(): number {
        return this._milliseconds;
    }

    public get seconds(): number {
        return this._seconds;
    }
}