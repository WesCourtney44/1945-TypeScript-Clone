interface Game {
    onStart(): void;
    step(delta: Delta): void;
    draw(): void;
    onStop(): void;
    eventBus: EventBus;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D ;
}