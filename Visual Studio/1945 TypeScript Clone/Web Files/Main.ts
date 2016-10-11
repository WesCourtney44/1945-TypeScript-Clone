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
    }
}