class EventBus {
    private readonly keyCodePressMap: ActionListMap = [];
    private readonly keyCodeReleaseMap: ActionListMap = [];
    private readonly anyPressList: KeyListenerList = [];
    private readonly anyReleaseList: KeyListenerList = [];
    private readonly key: KeyStateHandler = new KeyStateHandler();

    constructor() {
        // give KEY PRESS listener to document
        document.addEventListener("keydown", (event: KeyboardEvent) => {
            let keyCode: KeyCode = event.keyCode;
            if (this.key.isUp(keyCode)) {
                this.key.press(keyCode);
                EventBus.runAllListenersIn(keyCode, this.anyPressList);
                EventBus.runAllActionsIn(this.keyCodePressMap[keyCode]);
            }
        });
        // give KEY RELEASE listener to document
        document.addEventListener("keyup", (event: KeyboardEvent) => {
            let keyCode: KeyCode = event.keyCode;
            if (!this.key.isUp(keyCode)) {
                this.key.release(keyCode);
                EventBus.runAllListenersIn(keyCode, this.anyReleaseList);
                EventBus.runAllActionsIn(this.keyCodeReleaseMap[keyCode]);
            }
        });
    }

    private static runAllListenersIn(keyCode: KeyCode, list?: KeyListenerList): void {
        if (list) {
            for (let listener of list) {
                listener(keyCode);
            }
        }
    }

    private static runAllActionsIn(list?: ActionList): void {
        if (list) {
            for (let action of list) {
                action();
            }
        }
    }

    public addKeyCodePressListener(keyCode: KeyCode, action: Action): this {
        EventBus.addEventAction(this.keyCodePressMap, keyCode, action);
        return this;
    }

    public addKeyCodeReleaseListener(keyCode: KeyCode, action: Action): this {
        EventBus.addEventAction(this.keyCodeReleaseMap, keyCode, action);
        return this;
    }

    public addAnyKeyPressListener(listener: KeyListener) {
        this.anyPressList.push(listener);
    }

    public addAnyKeyReleaseListener(listener: KeyListener) {
    this.anyReleaseList.push(listener);
    }

    private static addEventAction(map: ActionListMap, keyCode: KeyCode, action: Action): void {
        if (!map[keyCode]) {
            map[keyCode] = [];
        }
        map[keyCode].push(action);
    }

}