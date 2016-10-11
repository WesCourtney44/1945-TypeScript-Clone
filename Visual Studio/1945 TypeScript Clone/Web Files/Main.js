window.onload = function () {
    Main.main();
};
class Main {
    static main() {
        let c = document.getElementById("myCanvas");
        let ctx = c.getContext("2d");
        ctx.beginPath();
        ctx.arc(95, 50, 60, 0, 2 * Math.PI);
        ctx.stroke();
        // Uncomment the code below to test GameEngine
        // count is incremented on every update
        // seconds uses the delta to increment by 1 every second.
        //let count = 0;
        //let seconds = 0;
        //(new GameEngine({
        //    onStart: () => { },
        //    step: (delta: Delta) => {
        //        count++;
        //        seconds += delta.apply(1);
        //    },
        //    draw: () => {
        //        ctx.clearRect(0, 0, c.width, c.height);
        //        ctx.fillText("Count: " + count.toString(), 32, 32);
        //        ctx.fillText("Seconds: " + (seconds).toString(), 32, 64);
        //    },
        //    onStop: () => { }
        //})).start();
    }
}
