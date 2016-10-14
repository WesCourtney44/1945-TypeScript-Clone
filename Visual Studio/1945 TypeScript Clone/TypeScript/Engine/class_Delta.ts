class Delta {

    private _milliseconds: number;
    private _seconds: number;

    constructor(milliseconds: number) {
        this._milliseconds = milliseconds;
        this._seconds = milliseconds / 1000;
    }

    public apply(unitsPerSecond: number): number {
        return this.seconds * unitsPerSecond;
    }

    public get milliseconds(): number {
        return this._milliseconds;
    }

    public get seconds(): number {
        return this._seconds;
    }
}