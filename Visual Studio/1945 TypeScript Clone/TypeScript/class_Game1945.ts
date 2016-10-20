class Game1945 implements IGame {

    private frames: number;
    private seconds: number;
    private clockSpeed: UnitsPerSecond;
    public myCanvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;

    constructor(private canvas: HTMLCanvasElement) {
        this.frames = 0;
        this.seconds = 0;
        this.clockSpeed = new UnitsPerSecond(1);
        this.myCanvas = canvas;
        this.context = this.canvas.getContext("2d");
    }

    public onStart(): void { /* Do Nothing */ }
    public onStop(): void { /* Do Nothing */ }

    public step(delta: Delta): void {
        this.frames++;
        this.seconds += this.clockSpeed.apply(delta);
    }

    public draw(): void {
        this.context.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height);
        this.context.beginPath();
        this.context.arc(95, 50, 60, 0, 2 * Math.PI);
        this.context.stroke();
        this.context.fillText("Frames: " + this.frames, 48, 32);
        this.context.fillText("Seconds: " + Math.floor(this.seconds), 48, 48);
        this.context.fillText("FPS: " + Math.floor(this.frames / this.seconds), 48, 64);
    }
}