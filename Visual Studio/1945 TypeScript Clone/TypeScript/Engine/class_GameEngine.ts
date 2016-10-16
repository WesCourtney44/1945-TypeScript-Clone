class GameEngine {

    private _isRunning: boolean;
    private previousTime: number;
    private game: IGame;

    constructor(private argGame: IGame) {
        this._isRunning = false;
        this.game = argGame;
        this.previousTime = 0;
    }

    public get isRunning(): boolean {
        return this._isRunning;
    }

    public start(): void {
        this._isRunning = true;
        this.game.onStart();
        this.previousTime = Date.now();
        this.loop();
    }

    private loop(): void {
        let currentTime: number = Date.now();
        let deltaValue: number = currentTime - this.previousTime;
        deltaValue = (deltaValue < 0) ? 0 : deltaValue;
        this.previousTime = Date.now();
        this.game.step(new Delta(deltaValue));
        this.game.draw();
        if (this.isRunning) {
            // wrapping the call to this.loop() in a closure
            // to protect it from using the wrong "this".
            window.requestAnimationFrame(() => { this.loop(); });
        }
    }

    public stop(): void {
        this._isRunning = false;
    }
}