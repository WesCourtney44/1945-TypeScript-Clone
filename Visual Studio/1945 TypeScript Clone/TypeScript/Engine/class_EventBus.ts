class EventBus {
    private readonly keyDownMap: ActionListMap = [];
    private readonly keyUpMap: ActionListMap = [];
    private readonly key: KeyStateHandler = new KeyStateHandler();

    constructor() {
        // give KEY PRESS listener to document
        document.addEventListener("keydown", (event: KeyboardEvent) => {
            let keyCode: KeyCode = event.keyCode;
            if (this.key.isUp(keyCode)) {
                this.key.press(keyCode);
                this.handleActionList(this.keyDownMap[keyCode]);
            }
        });
        // give KEY RELEASE listener to document
        document.addEventListener("keyup", (event: KeyboardEvent) => {
            let keyCode: KeyCode = event.keyCode;
            if (!this.key.isUp(keyCode)) {
                this.key.release(keyCode);
                this.handleActionList(this.keyUpMap[keyCode]);
            }
        });
    }

    private handleActionList(list?: ActionList): void {
        if (list) {
            for (let action of list) {
                action();
            }
        }
    }

    public eventKeyDown(keyCode: KeyCode, action: Action): void {
        let map: ActionListMap = this.keyDownMap;
        if (!map[keyCode]) {
            map[keyCode] = [];
        }
        map[keyCode].push(action);
    }

}