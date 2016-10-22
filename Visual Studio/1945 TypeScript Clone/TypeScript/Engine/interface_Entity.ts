interface Entity {
    x: number;
    y: number;
    step(delta: Delta): void;
    draw(): void;
}