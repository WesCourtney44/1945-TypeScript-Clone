class Game1945 implements IGame {
    private frames: number = 0;
    private seconds: number = 0;
    private clockSpeed: UnitsPerSecond = new UnitsPerSecond(1);
    private eventBus: EventBus = new EventBus();
    private coords: { x: number, y: number } = { x: 64, y: 64 };

    constructor(private canvas: HTMLCanvasElement) {
        this.eventBus.eventKeyDown(KeyCode.UP_ARROW, () => {
            this.coords.y -= 4;
        });
        this.eventBus.eventKeyDown(KeyCode.DOWN_ARROW, () => {
            this.coords.y += 4;

        });
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
        let x: number = this.coords.x;
        let y: number = this.coords.y;
        context.fillRect(x, y, 64, 64);
        context.fillText("Frames: " + this.frames, 48, 32);
        context.fillText("Seconds: " + Math.floor(this.seconds), 48, 48);
        context.fillText("FPS: " + Math.floor(this.frames / this.seconds), 48, 64);
    }
}