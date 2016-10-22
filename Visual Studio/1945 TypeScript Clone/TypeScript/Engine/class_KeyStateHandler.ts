class KeyStateHandler {
    private readonly _keyState: KeyState[] = [];

    public getState(key: KeyCode): KeyState {
        if (!this._keyState[key]) {
            this._keyState[key] = "up";
        }
        return this._keyState[key];
    }

    public isUp(key: KeyCode): boolean {
        return this.getState(key) === "up";
    }

    public press(key: KeyCode): void {
        this._keyState[key] = "down";
    }

    public release(key: KeyCode): void {
        this._keyState[key] = "up";
    }
}