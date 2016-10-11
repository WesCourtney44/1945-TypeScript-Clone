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
    constructor(private seconds: number) { }

    public apply(unitsPerSecond: number): number {
        return this.seconds * unitsPerSecond;
    }
}