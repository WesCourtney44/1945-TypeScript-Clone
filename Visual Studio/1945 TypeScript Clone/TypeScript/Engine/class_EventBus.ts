class EventBus {
    private readonly keyPressMap: ActionListMap = [];
    private readonly keyReleaseMap: ActionListMap = [];
    private readonly key: KeyStateHandler = new KeyStateHandler();

    constructor() {
        // give KEY PRESS listener to document
        document.addEventListener("keydown", (event: KeyboardEvent) => {
            let keyCode: KeyCode = event.keyCode;
            if (this.key.isUp(keyCode)) {
                this.key.press(keyCode);
                EventBus.runAllActionsIn(this.keyPressMap[keyCode]);
            }
        });
        // give KEY RELEASE listener to document
        document.addEventListener("keyup", (event: KeyboardEvent) => {
            let keyCode: KeyCode = event.keyCode;
            if (!this.key.isUp(keyCode)) {
                this.key.release(keyCode);
                EventBus.runAllActionsIn(this.keyReleaseMap[keyCode]);
            }
        });
    }

    private static runAllActionsIn(list?: ActionList): void {
        if (list) {
            for (let action of list) {
                action();
            }
        }
    }

    public addKeyPressListener(keyCode: KeyCode, action: Action): this {
        EventBus.addEventAction(this.keyPressMap, keyCode, action);
        return this;
    }

    public addKeyReleaseListener(keyCode: KeyCode, action: Action): this {
        EventBus.addEventAction(this.keyReleaseMap, keyCode, action);
        return this;
    }

    private static addEventAction(map: ActionListMap, keyCode: KeyCode, action:Action): void {
        if (!map[keyCode]) {
            map[keyCode] = [];
        }
        map[keyCode].push(action);
    }

}