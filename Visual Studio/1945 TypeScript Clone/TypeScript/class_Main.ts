class Main {
    public static main(): void {
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("myCanvas");
        let game: Game = new Game1945(canvas);
        let engine: GameEngine = new GameEngine(game);
        engine.start();
    }
}