class Game1945 implements IGame {

    private count: number;
    private seconds: number;

    constructor(private canvas: HTMLCanvasElement) {
        this.count = 0;
        this.seconds = 0;
    }

    public onStart = () => { /* Do Nothing */ };
    public onStop = () => { /* Do Nothing */ };

    public step = (delta: Delta) => {
        this.count++;
        this.seconds += delta.apply(1);
        // console.log("delta: " + delta.seconds);
    };

    public draw = () => {
        let context: CanvasRenderingContext2D = this.canvas.getContext("2d");
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        context.beginPath();
        context.arc(95, 50, 60, 0, 2 * Math.PI);
        context.stroke();
        context.fillText("Count: " + this.count, 32, 32);
        context.fillText("Seconds: " + Math.floor(this.seconds), 32, 64);
    };
}