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
    }
}
