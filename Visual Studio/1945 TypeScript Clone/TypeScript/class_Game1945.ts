class Game1945 implements Game {
    public readonly eventBus: EventBus = new EventBus();
    public readonly canvas: HTMLCanvasElement;
    private frames: number = 0;
    private seconds: number = 0;
    private clockSpeed: UnitsPerSecond = new UnitsPerSecond(1);
    private readonly blockEntity: Entity;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.blockEntity = new TestBlockEntity(64, 64, this);
    }

    public get context(): CanvasRenderingContext2D {
        return this.canvas.getContext("2d");
    }

    public onStart(): void { /* Do Nothing */ }
    public onStop(): void { /* Do Nothing */ }

    public step(delta: Delta): void {
        this.blockEntity.step(delta);
        this.frames++;
        this.seconds += this.clockSpeed.apply(delta);
    }

    public draw(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.blockEntity.draw();
        this.context.beginPath();
        this.context.arc(95, 50, 60, 0, 2 * Math.PI);
        this.context.stroke();
        this.context.fillText("Frames: " + this.frames, 48, 32);
        this.context.fillText("Seconds: " + Math.floor(this.seconds), 48, 48);
        this.context.fillText("FPS: " + Math.floor(this.frames / this.seconds), 48, 64);
    }
}