interface Game {
    onStart(): void;
    step(delta: Delta): void;
    draw(): void;
    onStop(): void;
}