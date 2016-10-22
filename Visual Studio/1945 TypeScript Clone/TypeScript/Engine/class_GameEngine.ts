class GameEngine {
    private readonly game: Game;
    private _isRunning: boolean = false;
    private previousTime: number = 0;

    constructor(game: Game) {
        this.game = game;
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