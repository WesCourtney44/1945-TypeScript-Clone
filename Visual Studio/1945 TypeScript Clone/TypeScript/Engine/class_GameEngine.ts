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
    };

    private loop = () => {
        let currentTime: number = Date.now();
        let deltaValue: number = currentTime - this.previousTime;
        deltaValue = (deltaValue < 0) ? 0 : deltaValue;
        this.previousTime = Date.now();
        this.game.step(new Delta(deltaValue));
        this.game.draw();
        if (this.isRunning) {
            window.requestAnimationFrame(this.loop);
        }
    };

    public stop = () => {
        this._isRunning = false;
    };
}