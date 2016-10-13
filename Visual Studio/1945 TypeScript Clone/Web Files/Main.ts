window.onload = function () {
    Main.main();
};

class Main {
    public static main(): void {
        let c: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("myCanvas");
        let ctx: CanvasRenderingContext2D = c.getContext("2d");
        ctx.beginPath();
        ctx.arc(95, 50, 60, 0, 2 * Math.PI);
        ctx.stroke();
        //Uncomment the code below to test GameEngine
        //count is incremented on every update
        //seconds uses the delta to increment by 1 every second.
        let count = 0;
        let seconds = 0;
        (new GameEngine({
            onStart: () => { },
            step: (delta: Delta) => {
                count++;
                seconds += delta.apply(1);
                //console.log("delta: " + delta.seconds);
            },
            draw: () => {
                ctx.clearRect(0, 0, c.width, c.height);
                ctx.fillText("Count: " + count, 32, 32);
                ctx.fillText("Seconds: " + Math.floor(seconds), 32, 64);
            },
            onStop: () => { }
        })).start();
    }
}