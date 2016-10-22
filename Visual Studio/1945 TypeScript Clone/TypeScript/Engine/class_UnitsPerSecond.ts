class UnitsPerSecond {
    public readonly value: number;

    constructor(units: number, seconds: number = 1) {
        this.value = units / seconds;
    }

    public apply(delta: Delta): number {
        return delta.apply(this.value);
    }
}