interface IGame {
    onStart(): void;
    step(delta: Delta): void;
    draw(): void;
    onStop(): void;
}