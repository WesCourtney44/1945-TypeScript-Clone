class Main {
    public static main(): void {
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("myCanvas");
        let game: IGame = new Game1945(canvas);
        let engine: GameEngine = new GameEngine(game);
        engine.start();
    }
}