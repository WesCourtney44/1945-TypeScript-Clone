class Game1945 implements IGame {

    private frames: number;
    private seconds: number;
    private clockSpeed: UnitsPerSecond;

    constructor(private canvas: HTMLCanvasElement) {
        this.frames = 0;
        this.seconds = 0;
        this.clockSpeed = new UnitsPerSecond(1);
    }

    public onStart(): void { /* Do Nothing */ }
    public onStop(): void { /* Do Nothing */ }

    public step(delta: Delta): void {
        this.frames++;
        this.seconds += this.clockSpeed.apply(delta);
    }

    public draw(): void {
        let context: CanvasRenderingContext2D = this.canvas.getContext("2d");
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        context.beginPath();
        context.arc(95, 50, 60, 0, 2 * Math.PI);
        context.stroke();
        context.fillText("Frames: " + this.frames, 48, 32);
        context.fillText("Seconds: " + Math.floor(this.seconds), 48, 48);
        context.fillText("FPS: " + Math.floor(this.frames / this.seconds), 48, 64);
    }
}