class UnitsPerSecond {

    private _value: number;

    constructor(units: number, seconds: number = 1) {
        this._value = units / seconds;
    }

    public get value(): number {
        return this._value;
    }

    public apply(delta: Delta): number {
        return delta.apply(this.value);
    }
}