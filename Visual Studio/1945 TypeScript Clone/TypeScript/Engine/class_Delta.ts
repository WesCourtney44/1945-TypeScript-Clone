class Delta {
    public readonly milliseconds: number;
    public readonly seconds: number;

    constructor(milliseconds: number) {
        this.milliseconds = milliseconds;
        this.seconds = milliseconds / 1000;
    }

    public apply(unitsPerSecond: number): number {
        return this.seconds * unitsPerSecond;
    }
}