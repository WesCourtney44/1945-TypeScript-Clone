class TestBlockEntity implements Entity {
    public x: number;
    public y: number;
    private readonly width: number = 64;
    private readonly height: number = 64;
    private readonly game: Game;
    private readonly speed: UnitsPerSecond = new UnitsPerSecond(64);
    private horizontal: "left" | "stopped" | "right" = "stopped";
    private vertical: "up" | "stopped" | "down" = "stopped";

    constructor(x: number, y: number, game: Game) {
        this.x = x;
        this.y = y;
        this.game = game;
        game.eventBus // method chaining
            // UP ARROW
            .eventKeyPress(KeyCode.UP_ARROW, () => {
                this.vertical = this.vertical === "stopped" ? "up" : this.vertical;
            })
            .eventKeyRelease(KeyCode.UP_ARROW, () => {
                this.vertical = this.vertical === "up" ? "stopped" : this.vertical;
            })
            // DOWN ARROW
            .eventKeyPress(KeyCode.DOWN_ARROW, () => {
                this.vertical = this.vertical === "stopped" ? "down" : this.vertical;
            })
            .eventKeyRelease(KeyCode.DOWN_ARROW, () => {
                this.vertical = this.vertical === "down" ? "stopped" : this.vertical;
            })
            // RIGHT ARROW
            .eventKeyPress(KeyCode.RIGHT_ARROW, () => {
                this.horizontal = this.horizontal === "stopped" ? "right" : this.horizontal;
            })
            .eventKeyRelease(KeyCode.RIGHT_ARROW, () => {
                this.horizontal = this.horizontal === "right" ? "stopped" : this.horizontal;
            })
            // LEFt ARROW
            .eventKeyPress(KeyCode.LEFT_ARROW, () => {
                this.horizontal = this.horizontal === "stopped" ? "left" : this.horizontal;
            })
            .eventKeyRelease(KeyCode.LEFT_ARROW, () => {
                this.horizontal = this.horizontal === "left" ? "stopped" : this.horizontal;
            });
    }

    public step(delta: Delta): void {
        let calculatedSpeed: number = this.speed.apply(delta);
        switch (this.horizontal) {
            case "left": this.x += -calculatedSpeed; break;
            case "right": this.x += calculatedSpeed; break;
        }
        switch (this.vertical) {
            case "up": this.y += -calculatedSpeed; break;
            case "down": this.y += calculatedSpeed; break;
        }
    }

    public draw(): void {
        let context = this.game.context;
        let temp = context.fillStyle;
        context.fillStyle = "red";
        context.fillRect(this.x, this.y, this.width, this.height);
        context.fillStyle = temp;
    }
}